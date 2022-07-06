import axios from "axios";
import baseURL from './base_url'

const ranksApi = axios.create({
  baseURL
})

export const getAllRanks = () => {
  return ranksApi
    .get(`/rank/list`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}