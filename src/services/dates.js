import api from '../helpers/apiClient';

// eslint-disable-next-line import/prefer-default-export
export function getDatesService(siteId, fromDate, toDate) {
  const params = {
    fromDate,
    toDate,
    siteId,
    requestedSlots: 1,
  };
  const payload = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
  return api.post('/appointment/timeslot/available', payload);
}
