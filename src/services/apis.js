import axios from 'axios'

class Apis {
    static BASE_URL = 'http://localhost:8080'

    static async authToken() {
        const token = window.localStorage.getItem('token')
        return axios.post(`${this.BASE_URL}/token/auth`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static async login(username, password) {
        return axios.post(`${this.BASE_URL}/login`, {
            "username": username,
            "password": password,
            "grantType": "password"
        }
        )
    }
}
export default Apis