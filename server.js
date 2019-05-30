const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const http = require('http')
const cookieParser = require('cookie-parser');

app
    .prepare()
    .then(() => {
        const server = express()
        server.use(cookieParser())

        // Server-side rendering an API
        // server.get('/p/:id', (req, res) => {
        // server.get('/post*', async (req, res) => {
        //     var actualPage = '/post'
        //     var queryParams = { id: req.params.id }
        //     app.render(req, res, actualPage, queryParams)
        // })

        // upon login, if user already login, redirect to home page
        server.get('/login', async (req, res) => {
            const token = req.cookies.token
            if (token) {
                res.redirect('/')
                return
            }
            app.render(req, res, '/login')
        })

        // upon logout, remove token from cookie
        server.get('/logout', (req, res) => {
            res.clearCookie('token')
            res.redirect('/login')
        })

        // Handle all requests as usual
        server.get('*', (req, res) => {
            // bypass these kinds of url
            console.log('URL: ', req.url)
            if (req.url.startsWith('/_next') || req.url.endsWith('.css') || req.url.endsWith('.js') || 
                req.url.endsWith('.ico') || req.url.endsWith('.jpg') || req.url.endsWith('.png') ||
                req.url.endsWith('.html') || req.url.endsWith('.json')) {
                return handle(req, res)
            }

            // validate access token
            const token = req.cookies.token
            if (!token) {
                console.log('Invalid token, logging out')
                res.redirect('/login')
                return
            }
            
            return handle(req, res)
        })

        // Listen to port
        let port = process.env.PORT || 3000
        server.listen(port, err => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })