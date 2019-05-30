const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './src', dev })
const handle = app.getRequestHandler()
const cookieParser = require('cookie-parser');
const axios = require('axios')

app
    .prepare()
    .then(() => {
        const server = express()
        server.use(cookieParser())

        // Server-side rendering an API
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
        server.get('*', async (req, res) => {
            // bypass these kinds of url
            if (req.url.startsWith('/_next') || req.url.endsWith('.css') || req.url.endsWith('.js') ||
                req.url.endsWith('.ico') || req.url.endsWith('.jpg') || req.url.endsWith('.png') ||
                req.url.endsWith('.html') || req.url.endsWith('.json')) {
                return handle(req, res)
            }

            const token = req.cookies.token

            // validate access token
            var requestHandled = false
            await axios.post(`http://localhost:8080/token/auth`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log('token auth success')
            }).catch(e => {
                const status = (e && e.response) ? e.response.status : 200
                console.log('token auth failed: ', status)

                switch (status) {
                    case 401: {
                        res.redirect('/logout')
                        requestHandled = true
                        break
                    }
                    case 403: {
                        app.render(req, res, '/')
                        requestHandled = true
                        break
                    }
                }
            })
            // if (!token) {
            //     console.log('Invalid token, logging out')
            //     res.redirect('/login')
            //     return
            // }

            if (!requestHandled) {
                return handle(req, res)
            }
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