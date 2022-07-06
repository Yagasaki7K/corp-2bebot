import {
  login,
} from "../../services/Auth";
import axios from "axios";


const state = () => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  status: '',
  error: ''
});

const mutations = {
  auth_success (state, params) {
    state.token = params.token;
    state.user = params.user;
  },
  auth_error(state, err) {
    state.status = 'error';
    state.error = err;
  },
  auth_logout(state) {
    state.status = '';
    state.token = '';
  },
};

const actions = {
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user).then(async data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
        commit('auth_success', data);
        resolve(data)
      })
      .catch(err => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        reject(err)
      })
    });
    
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        commit('auth_logout');
        resolve();
      } catch (err) {
        commit('auth_error', err);
        reject(err);
      }
    });
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
};

const userAuth = { namespaced: true, state, mutations, actions, getters };

export default userAuth;
