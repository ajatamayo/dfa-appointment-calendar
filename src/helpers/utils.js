import crypto from 'crypto';
import { ACCESS_TOKEN } from '../constants';

async function generateRandomString(length = 24) {
  try {
    const buf = crypto.randomBytes(length);
    return buf.toString('hex');
  } catch (err) {
    return false;
  }
}

function removeAuthTokens() {
  localStorage.removeItem(ACCESS_TOKEN);
}

export {
  generateRandomString,
  removeAuthTokens,
};
