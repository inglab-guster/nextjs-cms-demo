import Link from 'next/link'
import Layout from '../components/layout';
import fetch from 'isomorphic-unfetch'

class Home extends React.Component {

    componentDidMount() {
        // this.getInitialProps()
    }

    static async getInitialProps() {
        const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        const data = await res.json()

        console.log(`Show data fetched. Count: ${data.length}`)

        return {
            shows: data.map(entry => entry.show)
        }
    }

    render() {
        return (
            <Layout>
                <div className='card p-3'>
                    <p>Hello Next.js</p>
                    <div>
                        Click
                        <Link href={{ pathname: '/about', query: { title: 'About page' } }}>
                            <a title='About Page'> me </a>
                        </Link>
                        to go about page
                    </div>

                    <ul>
                        {this.props.shows.map(show => (
                            <li key={show.id}>
                                <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                                    <a>{show.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Layout>
        )
    }
}

export default Home