import axios from "axios";
import baseURL from './base_url'

const appointmentsApi = axios.create({
  baseURL
})


export const getAppointmentsByDistributor = (data) => {
  return appointmentsApi
    .get(`/appointment/distributor/${data}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const updateStatusAppointment = (data) => {
  return appointmentsApi
    .put(`/appointment/reassign/12`, data)
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const getLeadsByCampaignId = (id) => {
  return appointmentsApi
    .get(`/lead/campaign/${id}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const updateAppointmentsContact = (id, { date = undefined, attendance_status = undefined }) => {
  return appointmentsApi
    .put(`/appointment/update/${id}`, { date, attendance_status })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const finishAppointments = (id, attendance_status) => {
  return appointmentsApi
    .put(`/appointment/finish/${id}`, { attendance_status })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const sendCsv = (data) => {
  return appointmentsApi
    .post(`/lead/parse`, data)
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const getHistoryCsv = () => {
  return appointmentsApi
    .get(`/mailing/list`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const getInfos = (date) => {
  return appointmentsApi
    .get(`/appointment/info?startDate=${date.startDate}&endDate=${date.endDate}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}





