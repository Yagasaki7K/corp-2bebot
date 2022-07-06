import axios from "axios";
import baseURL from './base_url'

const candidatesApi = axios.create({
  baseURL
})


export const getAppointmentsById = (id) => {
  return candidatesApi
    .get(`/appointment/distributor/${id}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getAppointments = (query = '') => {
  return candidatesApi
    .get(`/appointment/list${query}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}
export const getAssignmentsById = (id) => {
  return candidatesApi
    .get(`/assignment/lead/${id}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}


export const getLeads = () => {
  return candidatesApi
    .get(`/lead/`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getInfos = () => {
  return candidatesApi
    .get(`/appointment/info`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getStatusAppointments = () => {
  return candidatesApi
    .get(`/analytics/appointments/status`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}