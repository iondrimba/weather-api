const getGeolocationByIp = require('../../../api/getGeolocationByIp');
const mockdataSucess = require('./mockdata.json');
const mockInvalidKey = require('./mockInvalidKey.json');
const mockMissingKey = require('./mockMissingKey.json');

describe('getGeolocationByIp', () => {
  beforeEach(() => {
    require('dotenv').config();
  });

  it('returns geolocation', async () => {
    const url = 'http://api.ipstack.com/221.83.87.170';
    const result = await getGeolocationByIp(url);

    expect(result).toEqual(mockdataSucess);
  });

  it('returns exception message', async () => {
    const url = 'xpto';
    const result = await getGeolocationByIp(url);

    expect(result).toEqual('Only absolute URLs are supported');
  });

  describe('when invalid SECRET_KEY supplied', () => {
    it('returns invalid key error', async () => {
      process.env.APP_IP_STACK = 'xpto';

      const url = 'http://api.ipstack.com/221.83.87.170';
      const result = await getGeolocationByIp(url);

      expect(result).toEqual(mockInvalidKey);
    });
  });

  describe('when no SECRET_KEY supplied', () => {
    it('returns missing key error', async () => {
      process.env.APP_IP_STACK = '';

      const url = 'http://api.ipstack.com/221.83.87.170';
      const result = await getGeolocationByIp(url);

      expect(result).toEqual(mockMissingKey);
    });
  });
});
