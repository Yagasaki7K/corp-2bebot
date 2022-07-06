import axios from "axios";
import baseURL from './base_url'

const authApi = axios.create({
    baseURL
})


const defaultError = { message: 'Ocorreu um erro de conectividade aos nossos servidores. Tente novamente mais tarde ou entre em contato com o suporte.' }

export const login = (user) => {
    return authApi
        .post(`/users/login`, user)
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response?.data || defaultError))
}

export const resetPass = (user) => {
    return authApi
        .put(`/user/reset`, user)
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response?.data || defaultError))
}
export const sendEmailRecovery = (user) => {
    return authApi
        .post(`/user/reset`, user)
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response?.data || defaultError))
}

export const create = (user) => {
    return authApi
        .post(`/users/create`, user, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response?.data || defaultError))
}

export const list = () => {
    return authApi
        .get(`/users/all`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response?.data || defaultError))
}

export const update = (user) => {
    return authApi
        .put(`/user`, user)
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response?.data || defaultError))
}



export const remove = (id) => {
    return authApi
        .post(`/users/delete`, { id }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response?.data || defaultError))
}