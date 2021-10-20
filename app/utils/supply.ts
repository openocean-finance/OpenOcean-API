import axios from 'axios';
const XCgProApiKey = 'CG-RCCRXPBuJMhKPa8p5spedAKn';
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
    console.log('getTokenPrice data:', data);
    return data;
  } catch (error) {
    console.log('getTokenPrice error', error);
    return {};
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
    return data;
  } catch (error) {
    console.log('getTokenPrice error', error);
    return {};
  }
};
