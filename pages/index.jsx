import Home from './home'
import Link from 'next/link'

class App extends React.Component {

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
            <Home shows={this.props.shows} />
            
        )
    }
}

export default App