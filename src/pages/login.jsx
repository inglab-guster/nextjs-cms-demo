import HeadlessLayout from "./headless-layout";
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import css from '../static/css/login.css'
import Apis from "../services/apis";

class Login extends React.Component {

    state = {
        username: '',
        password: '',
        error: ''
    }

    static async getInitialProps(context) {
        return {}
    }

    constructor(props) {
        super(props)
    }

    async onSubmit(e) {
        e.preventDefault()

        this.setState({ isLoading: true })

        // login
        await Apis.login(this.state.username, this.state.password).then(res => {
            this.setState({ isLoading: false })

            // save the access token
            const body = res.data
            window.localStorage.setItem('token', JSON.stringify(body))
            document.cookie = `token=${body.accessToken}`

            // go to home page after login
            Router.push('/')
            return

        }).catch(e => {
            // login failture, show the error message
            this.setState({ isLoading: false })
            this.setState({ error: e.response.data.message })
        })
    }

    render() {
        return (
            <HeadlessLayout>
                <div className={`${css.content} card p-3 mx-auto`}>
                    <h1>CMS Login</h1>
                    <form action='#' onSubmit={this.onSubmit.bind(this)}>
                        {/* username */}
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="text" className="form-control" placeholder="Username" required value={this.state.username} onChange={(e) => {
                                this.setState({ username: e.target.value })
                            }} />
                            <small className="form-text text-muted">Your registered username.</small>
                        </div>

                        {/* password */}
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" placeholder="Password" required value={this.state.password} onChange={(e) => {
                                this.setState({ password: e.target.value })
                            }} />
                            {/* error message */}
                            <small className={`form-text text-muted ${css.error}`}>{this.state.error}</small>
                        </div>

                        {/* submit button */}
                        <div className='row'>
                            <button type="submit" className="btn btn-primary ml-3">Submit</button>

                            {/* loading bar */}
                            {
                                this.state.isLoading ?
                                    <div className="spinner-border text-success ml-3" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div> : null
                            }
                        </div>

                    </form>
                </div>
            </HeadlessLayout>
        )
    }
}

export default Login