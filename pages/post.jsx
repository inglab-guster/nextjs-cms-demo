import Link from 'next/link'
import Layout from '../components/layout';
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

class Post extends React.Component {

    static async getInitialProps(context) {
        // test token validation
        // var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwidXNlciI6eyJyb2xlIjoiUk9MRV9BRE1JTiIsImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn0sImlhdCI6MTU1OTE4MDE0NywiZXhwIjoxNTU5MTgxMDQ3fQ.epTsAf-Hq1W-JrcrTexv9V9KNw_iHbqDxp2Yty2cw_4phZfiI_U82Ssb1Af07QZYmYax0OqjCTw_Y7Cv6B1T_A'
        // var authRes = await fetch('http://localhost:8080/token/auth', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })

        // // redirect back to login page for 401 response
        // if (authRes.status != 200) {
        //     if (context.res) {
        //         // server redirects
        //         context.res.writeHead(301, { Location: '/login' })
        //         context.res.end()
        //     } else {
        //         // client redirects
        //         Router.push('/login')
        //     }
        //     return {}
        // }

        // fetch posts
        try {
            const { id } = context.query
            const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
            const show = await res.json()
            console.log(`Fetched show: ${show.name} with id: ${id}, status: ${res.status}`)

            return { show }

        } catch (ex) {
            // redirect back to home page for 403 response
            console.error('fetch error', ex)
            Router.push('/')
            return {}
        }
    }

    postData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then(response => response.json()); // parses JSON response into native Javascript objects 
    }

    render() {
        return (this.props.show ?
            <Layout>
                <h1>{this.props.show.name}</h1>
                <p>{this.props.show.summary.replace(/<[/]?p>/g, '')}</p>
                <img src={this.props.show.image.medium} />
            </Layout>
            : null
        )
    }
}
export default Post