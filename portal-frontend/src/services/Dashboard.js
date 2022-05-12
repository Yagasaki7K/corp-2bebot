import axios from "axios";
import url from './base_urls'

export const baseURL = `${url.backend}/dashboard`
const dashboardService = axios.create({
  baseURL
})


export const top10ProductsSell = (id, startDate, endDate) => {
  let params = ''
  if (id)
    params = `?catalog=${id}`

  return dashboardService
    .post(`/top10ProductsSell${params}`, { startDate, endDate })
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}
export const totalOrdersSales = (id, startDate, endDate) => {
  let params = ''
  if (id)
    params = `?catalog=${id}`
  return dashboardService
    .post(`/totalOrdersSales${params}`, { startDate, endDate })
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}
export const utmInsightsList = (id, startDate, endDate) => {
  let params = ''
  if (id)
    params = `?catalog=${id}`
  return dashboardService
    .post(`/utm/insights${params}`, { startDate, endDate })
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const utmCartData = (id, startDate, endDate) => {
  let params = ''
  if (id)
    params = `?catalog=${id}`
  return dashboardService
    .get(`/utm/cart${params}`, { startDate, endDate })
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

export const utmCartItems = (id, startDate, endDate) => {
  let params = ''
  if (id)
    params += `?catalog=${id}`
  if (startDate)
    params += `&startDate=${startDate}`
  if (endDate)
    params += `&endDate=${endDate}`
  return dashboardService
    .get(`/utm/cartitems${params}`)
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}
export const utmAccessData = (id, startDate, endDate) => {
  let params = ''
  if (id)
    params = `?catalog=${id}`
  return dashboardService
    .post(`/utm/access${params}`, { startDate, endDate })
    .then(({ data }) => data)
    .catch(err => Promise.reject(new Error(err)))
}

