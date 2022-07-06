import axios from "axios";
import baseURL from './base_url'

const distributorsApi = axios.create({
  baseURL
})




export const getDistributors = () => {
  return distributorsApi
    .get(`/distributor/find/listAll`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const createDistributors = (data) => {
  return distributorsApi
    .post(`/distributor`, data,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const updateDistributors = (data) => {
  return distributorsApi
    .put(`/distributor`, data,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const getBlocks = () => {
  return distributorsApi
    .get(`/distributor/block/list`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const updateStatus = (data) => {
  return distributorsApi
    .put(`/distributor/block`, data,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const showDistributor = (data) => {
  return distributorsApi
    .get(`/distributor/${data}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}


export const block = (data) => {
  return distributorsApi
    .post(`/distributor/block`, data,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}