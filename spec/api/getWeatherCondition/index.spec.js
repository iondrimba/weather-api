const getWeatherCondition = require('../../../api/getWeatherCondition');
const mockdataSuccess = require('./mockForecast.json');

describe('getWeatherCondition', () => {
  beforeAll(() => {
    require('dotenv').config();
  });

  it('returns forecast', async () => {
    const secret = process.env.WEATHER_API;
    const baseUrl = 'https://api.weatherapi.com';
    const endpoint = (latitude, longitude) => `${baseUrl}/v1/current.json?q=${latitude},${longitude}&lang=pt&key=${secret}`;

    const result = await getWeatherCondition(endpoint(-23.5733, -46.6417));
    

    expect(result.latitude).toEqual(mockdataSuccess.latitude);
    expect(result.longitude).toEqual(mockdataSuccess.longitude);
    expect(result.timezone).toEqual(mockdataSuccess.timezone);
  });
});
