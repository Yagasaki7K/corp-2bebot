import axios from "axios";
import url from './base_urls'

export const baseURL =`${url.backend}/users`
const authService = axios.create({
    baseURL
})

export const create = (data) => {
    return authService
        .post(`/signUp`, data,)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const login = (data) => {
    return authService
        .post(`/signIn`, data,)
        .then(({ data }) => data)
        .catch(err => Promise.reject(err))
}


export const list = (query = '', body = {}) => {
    return authService
        .post(`/find${query}`, body, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}


export const read = (id) => {
    return authService
        .get(`/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const readJwt = (jwt) => {
    return authService
        .get(`/read`, {
            headers: {
                Authorization: jwt
            }
        })
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const update = ({ _id, ...data }) => {
    return authService
        .put(`/${_id}`, data, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}
export const updateSend = ({ _id }) => {
    return authService
        .put(`/sent/${_id}`, {}, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const remove = ({ _id }) => {
    return authService
        .delete(`/${_id}`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const addRepresentante = ({ representante, gerente }) => {
    return authService
        .put(`/${gerente._id}/representante`, representante, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}
