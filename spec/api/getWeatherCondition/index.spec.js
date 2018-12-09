const getWeatherCondition = require('../../../api/getWeatherCondition');
const mockdataSucess = require('./mockForecast.json');

describe('getWeatherCondition', () => {
  beforeAll(() => {
    require('dotenv').config();
  });

  it('returns forecast', async () => {
    const secret = process.env.DARK_SKY_API_CODE;
    const baseUrl = 'https://api.darksky.net/forecast';
    const endpoint = (latitude, longitude) => `${baseUrl}/${secret}/${latitude},${longitude}?units=auto`;
    const result = await getWeatherCondition(endpoint(-23.5733, -46.6417));

    expect(result.latitude).toEqual(mockdataSucess.latitude);
    expect(result.longitude).toEqual(mockdataSucess.longitude);
    expect(result.timezone).toEqual(mockdataSucess.timezone);
  });

  it('returns exception message', async () => {
    const url = 'xpto';
    const result = await getWeatherCondition(url);

    expect(result).toEqual('Only absolute URLs are supported');
  });
});
