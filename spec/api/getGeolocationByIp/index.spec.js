const getGeolocationByIp = require('../../../api/getGeolocationByIp');
const mockdataSucess = require('./mockdata.json');
const berlinIp = '85.214.18.16';

describe('getGeolocationByIp', () => {
  beforeEach(() => {
    require('dotenv').config();
  });

  it('returns geolocation', async () => {
    const url = `https://tools.keycdn.com/geo.json?host=${berlinIp}`;
    const result = await getGeolocationByIp(url, 'keycdn-tools:https://weather.iondrimbafilho.me');

    expect(result.data.geo.country_name).toEqual(mockdataSucess.country_name);
    expect(result.data.geo.city).toEqual(mockdataSucess.city);
  });

  describe('when UserAgent is invalid', () => {
    it('returns error status', async () => {
      const error = {
        status: 'error',
        description: 'User-Agent not properly defined. Please check the docs: https://tools.keycdn.com/geo',
      };

      const url = `https://tools.keycdn.com/geo.json?host=${berlinIp}`;
      const result = await getGeolocationByIp(url);

      expect(result).toEqual(error);
    });
  });
});
