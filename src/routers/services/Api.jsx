import axios from "axios"

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3662/v1/aguacomun',
        withCredentials: true,
        timeout: 2000
    }
)

//lOGIN
export const loginRequest = async(user)=> {
    try {
        return await apiClient.post('/auth/login', user)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

//LOGOUT
export const logoutRequest = async()=> {
    try {
        return await apiClient.post('/auth/logout')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}