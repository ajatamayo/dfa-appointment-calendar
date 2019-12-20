module.exports = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8021/xqwapi',
  localStorageCacheLifetime: parseInt(
    process.env.REACT_APP_LOCAL_STORAGE_CACHE_LIFETIME || 300000, 10,
  ),
  localStorageStaleLifetime: parseInt(
    process.env.REACT_APP_LOCAL_STORAGE_STALE_LIFETIME || 86400000, 10,
  ),
};
