import axios from "axios";
import baseURL from './base_url'

const getDash = axios.create({
  baseURL
})


export const getConversions = (date) => {
  return getDash
    .get(`/analytics/conversions?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getTransfers = (date) => {
  return getDash
    .get(`/analytics/transfers/ranks?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getDistributors = (date = null) => {
  const params = date ? `?startDate=${date.startDate}&endDate=${date.endDate}` : ''
  return getDash
    .get(`/analytics/distributors${params}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getAppointments = (date) => {
  return getDash
    .get(`/analytics/appointments?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}


export const getLastDistributors = () => {
  return getDash
    .get(`/distributor/find/listAll?query=10`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getGenresChart = (date) => {
  return getDash
    .get(`/analytics/appointments/gender?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getFromChannelsChart = (date) => {
  return getDash
    .get(`/analytics/appointments/channels?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getAppointmentsByRanks = (date) => {
  return getDash
    .get(`/analytics/appointments/done/ranks?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getAssignmentsByRank = (date) => {
  return getDash
    .get(`/analytics/assignments/ranks?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getAppointmentsByRankSold = (date) => {
  return getDash
    .get(`/analytics/appointments/ranks/sold?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getWhereKnowledge = (date) => {
  return getDash
    .get(`/analytics/appointments/knowledge?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const getStatusAppointments = (date) => {
  return getDash
    .get(`/analytics/appointments/status?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}
export const getAppointmentsWait = (date) => {
  return getDash
    .get(`/analytics/appointments/waiting/ranks?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

