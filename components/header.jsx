import Link from 'next/link'
import '../static/css/header.css'

const linkStyle = {
    marginRight: 15
}

class Header extends React.Component {

    logout() {
        window.localStorage.removeItem('token')
    }

    render() {
        return (
            <div className='p-4 header'>
                <Link href="/">
                    <a style={linkStyle}>Home</a>
                </Link>
                <Link href="/about">
                    <a style={linkStyle}>About</a>
                </Link>
                <Link href="/logout">
                    <a style={linkStyle} onClick={this.logout.bind(this)}>Sign Out</a>
                </Link>
            </div>
        )
    }

}

export default Header