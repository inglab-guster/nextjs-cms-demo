import Link from 'next/link'
import Layout from '../components/layout';
import fetch from 'isomorphic-unfetch'

class Home extends React.Component {

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
                </div>

                <h3 className='m-3'>Upcoming shows</h3>
                <ul className='list-group'>
                    {this.props.shows.map(show => (
                        <li className='list-group-item' key={show.id}>
                            {/* <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}> */}
                            <Link href={`/post?id=${show.id}`}>
                                <a>{show.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Layout>
        )
    }
}

export default Home