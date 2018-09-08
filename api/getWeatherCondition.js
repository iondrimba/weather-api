const fetch = require('node-fetch');

module.exports = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    return error.message;
  }
};
