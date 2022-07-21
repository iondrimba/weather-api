const fetch = require('node-fetch');

module.exports = async (url, key) => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': key,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    return error.message;
  }
};
