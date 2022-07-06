const homolog = 'http://5.161.81.199:3001/'

const prod = 'http://5.161.81.199:3001/'

const baseUrls = { homolog, prod }
const href = window.location.href
const isDev = href.includes('localhost') ? 'homolog' : null
const environment = isDev || 'prod'
const getBaseUrl = (env = environment) => baseUrls[env]

export default getBaseUrl()