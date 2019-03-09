import api from '../helpers/apiClient';

// eslint-disable-next-line import/prefer-default-export
export function getSitesService() {
  return api.post('/sites', 'regionId=1&countryId=1');
}
