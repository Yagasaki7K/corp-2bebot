import axios from "axios";
import baseURL from './base_url'

const rolesApi = axios.create({
    baseURL
})


export const list = () => {
    return rolesApi
        .get(`/role`)
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response.data))
}