import api from '../helpers/apiClient';

// eslint-disable-next-line import/prefer-default-export
export function getTimeslotsService(siteId, preferredDate) {
  const params = {
    preferredDate,
    siteId,
    requiredSlots: 1,
  };
  const payload = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
  return api.post('/appointment/timeslot', payload);
}
