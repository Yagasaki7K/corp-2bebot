import axios from "axios";
import baseURL from './base_url'

const campaignApi = axios.create({
  baseURL
})


export const getCampaigns = () => {
  return campaignApi
    .get(`/campaings/all`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const createCampaigns = (data) => {
  return campaignApi
    .post(`/campaings/create`, data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const updateCampaigns = (data) => {
  return campaignApi
    .put(`/campaign`, data)
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const deleteCampaign = ({ _id }) => {
  return campaignApi
    .post(`/campaings/delete`, { id: _id }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const launchCampaign = ({ _id }) => {
  return campaignApi
    .post(`/campaings/launchCampaings`, { idCampaing: _id }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}

export const downloadCampaign = ({ _id }) => {
  return campaignApi
    .get(`/campaings/extractCampaignReport/${_id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      responseType: "blob",
    })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}


export const getCampaign = (id) => {
  return campaignApi
    .get(`/campaings/findOne/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then(({ data }) => data)
    .catch(err => Promise.reject(err))
}
