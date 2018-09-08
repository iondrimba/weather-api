module.exports = (url, params) => {
  let queryString = '';

  Object.entries(params).forEach(([key, value]) => {
    queryString += `${key}=${value}&`;
  });

  return `${url}?${encodeURI(queryString)}`;
};
