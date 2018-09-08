module.exports = (url, params) => {
  let queryString = '';

  Object.entries(params).forEach(([key, value]) => {
    queryString += `${key}=${value}&`;
  });

  const queryParams = queryString.length ? `?${encodeURI(queryString)}` : '';

  return `${url}${queryParams}`;
};
