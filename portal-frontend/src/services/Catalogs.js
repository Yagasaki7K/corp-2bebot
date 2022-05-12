import axios from "axios";
import url from './base_urls'

export const baseURL = `${url.backend}/catalogs`
const catalogService = axios.create({
    baseURL
})

export const getImage = (path) => {
    return catalogService
        .get(`/images/path`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const generateImages = (id) => {
    return catalogService
        .post(`/images/${id}`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}
export const automap = (id) => {
    return catalogService
        .post(`/automap/${id}`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}


export const addPage = (id, formData) => {
    return catalogService
        .post(`/page/${id}`, formData,
            {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                }
            })
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const alterPdf = (id, formData) => {
    return catalogService
        .post(`/pdf/${id}`, formData,
            {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                }
            })
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response))
}

export const create = (formData) => {
    return catalogService
        .post(`/`, formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            }
        })
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response))
}


export const list = () => {
    return catalogService
        .get(`/`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const listTable = () => {
    return catalogService
        .get(`/table`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}


export const getCatalog = (id) => {
    return catalogService
        .get(`/${id}`)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}

export const update = ({ _id, ...data }) => {
    return catalogService
        .put(`/${_id}`, data)
        .then(({ data }) => data)
        .catch(err => Promise.reject(new Error(err)))
}
