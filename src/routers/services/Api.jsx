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

//REGISTER
export const registerRequest = async(user) => {
    try {
        return await apiClient.post('/auth/register', user)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

//NEW REPORT
export const newReportRequest = async(report) => {
    try {
        return await apiClient.post('/reports/new', report)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

//GET REPORTS
export const getReportsRequest = async() => {
    try {
        return await apiClient.get('/reports/list')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

//GET REPORT BY ID
export const getReportByIdRequest = async(id) => {
    try {
        return await apiClient.get(`/reports/list/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

//UPDATE REPORT
export const updateReportRequest = async(id, report) => {
    try {
        return await apiClient.put(`/reports/updated/${id}`, report)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

//DELETE REPORT
export const deleteReportRequest = async(id) => {
    try {
        return await apiClient.delete(`/reports/delete/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

//GET ALL COMMUNITY'S
export const getCommunitysRequest = async()=> {
    try {
        return await apiClient.get('/community/list')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}