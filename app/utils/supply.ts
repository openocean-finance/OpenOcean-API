import axios from 'axios';
const XCgProApiKey = '';
const XCgProApiHost = 'https://pro-api.coingecko.com/api/v3';

export const getPriceByAddress = async (platform: string, contract_addresses: string): Promise<any> => {
  try {
    const reqUrl = `${XCgProApiHost}/simple/token_price/${platform}`;
    const { data } = await axios({
      url: reqUrl,
      method: 'GET',
      responseType: 'json',
      headers: { 'X-Cg-Pro-Api-Key': XCgProApiKey },
      params: {
        contract_addresses,
        vs_currencies: 'usd',
      },
    });
    return [ null, data ];
  } catch (error) {
    console.log('getPriceByAddress error', error);
    return [ error ];
  }
};

export const getPriceByIds = async (ids: string): Promise<any> => {
  try {
    const reqUrl = `${XCgProApiHost}/simple/price`;
    const { data } = await axios({
      url: reqUrl,
      method: 'GET',
      responseType: 'json',
      headers: { 'X-Cg-Pro-Api-Key': XCgProApiKey },
      params: {
        ids,
        vs_currencies: 'usd',
      },
    });
    console.log('getPriceByIds data:', data);
    return [ null, data ];
  } catch (error) {
    console.log('getPriceByIds error', error);
    return [ error ];
  }
};
