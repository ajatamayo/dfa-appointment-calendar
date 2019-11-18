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

function getKey(method, args) {
  return `${method}-${args.join('-')}`;
}

function getCachedData(key) {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    const elapsedTime = new Date() - new Date(parsedData.timestamp);
    if (elapsedTime < config.localStorageCacheLifetime) {
      return Promise.resolve(parsedData);
    }
  }
  return null;
}

const saveData = (response, key) => {
  if (storageAvailable('localStorage')) {
    const { data } = response;
    const timestamp = new Date();
    localStorage.setItem(key, JSON.stringify({ data, timestamp }));
  }
  return response;
};

function storageAvailable(type) {
  let storage;
  const x = '__storage_test__';
  try {
    storage = window[type];
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22
      // Firefox
      || e.code === 1014
      // test name field too, because code might not be present
      // everything except Firefox
      || e.name === 'QuotaExceededError'
      // Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && (storage && storage.length !== 0);
  }
}

function createApiClient() {
  return {
    get(...args) {
      return createClient().get(...args);
    },
    post(...args) {
      const key = getKey('post', args);
      if (storageAvailable('localStorage')) {
        const cachedData = getCachedData(key);
        if (cachedData) {
          return Promise.resolve(cachedData);
        }
      }
      return createClient().post(...args).then(response => saveData(response, key));
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
