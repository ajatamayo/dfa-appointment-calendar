import axios from 'axios';
import config from '../config';

function getAuthorizationHeaders() {
  return {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
}

function createClient() {
  return axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
      ...getAuthorizationHeaders(),
    },
  });
}

function createApiClient() {
  return {
    get(...args) {
      return createClient().get(...args);
    },
    post(...args) {
      return createClient().post(...args);
    },
    put(...args) {
      return createClient().put(...args);
    },
    delete(...args) {
      return createClient().delete(...args);
    },
  };
}

export default createApiClient();
