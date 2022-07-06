import axios from 'axios';

const { BANDMASTER_USERNAME, BANDMASTER_PASSWORD, BANDMASTER_AUTH, BANDMASTER_MESSAGE } = process.env;

const refreshAccessToken = async () => {
  const { data: { token } } = await axios.post(`${BANDMASTER_AUTH}/authentication`, {
    username: process.env.BANDMASTER_USERNAME,
    password: process.env.BANDMASTER_PASSWORD,
  });

  return token;
};

const bandmasterGateway = axios.create({
  baseURL: process.env.BANDMASTER_MESSAGE,
  headers: { identifier: '529' }
});

bandmasterGateway.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.authRetry) {
      originalRequest.authRetry = true;
      const token = await refreshAccessToken();

      bandmasterGateway.defaults.headers = { ...bandmasterGateway.defaults.headers };
      bandmasterGateway.defaults.headers.common.Authorization = `Bearer ${token}`

      return bandmasterGateway(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default bandmasterGateway;