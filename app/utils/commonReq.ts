import axios from 'axios';
export const pkgReq = async (reqUrl: string, params: any, headers?:any): Promise<any> => {
  console.log('request url: ', reqUrl);
  console.log('request body: ', params);
  try {
    const result = await axios({
      url: reqUrl,
      method: 'GET',
      headers,
      responseType: 'json',
      params,
    });
    // console.log('response result: ', result);
    return result && result.data ? result.data : result;
  } catch (error) {
    console.log('error', error);
    return {};
  }
};
