import Layout from '../components/layout'
import '../static/css/about.css'

class About extends React.Component {

    componentDidMount() {
        console.log('about page', this.props)
    }

    render() {
        return (
            <Layout>
                <p>This is the about page</p>
            </Layout>
        )
    }
}

export default About