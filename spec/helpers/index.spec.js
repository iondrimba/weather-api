const addQueryParams = require('../../helpers/addQueryParams');

describe('addQueryParams', () => {
  it('returns url with query params', () => {
    const result = addQueryParams('https://xpto.com', {name: 'jon doe', utm_source: 'google'});

    expect(result).toBe('https://xpto.com?name=jon%20doe&utm_source=google&');
  });

  it('returns url without query params', () => {
    const result = addQueryParams('https://xpto.com', {});

    expect(result).toBe('https://xpto.com');
  });
});
