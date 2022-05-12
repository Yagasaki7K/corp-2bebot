import axios from "axios";
import url from './base_urls'
export const baseURL = `${url.backend}/products`
const productService = axios.create({
    baseURL
})


export const create = (data) => {
    return productService
        .post(`/`, data)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const uploadXlsx = (data) => {
    return productService
        .post(`/xlsx`, data)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}


export const list = () => {
    return productService
        .get(`/`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}


export const getCatalog = (id) => {
    return productService
        .get(`/${id}`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const update = ({ _id, ...data }) => {
    return productService
        .put(`/${_id}`, data)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const remove = ({ _id }) => {
    return productService
        .delete(`/${_id}`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}
