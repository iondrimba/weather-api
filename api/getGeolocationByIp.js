const fetch = require('node-fetch');
const addQueryParams = require('../helpers/addQueryParams');

module.exports = async (url) => {
  try {
    const response = await fetch(addQueryParams(url, {
      access_key: process.env.APP_IP_STACK,
    }));
    const result = await response.json();

    return result;
  } catch (error) {
    return error.message;
  }
};
