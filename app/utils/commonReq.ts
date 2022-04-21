import axios from 'axios';
import { logger } from './utils';
export const pkgReq = async (reqUrl: string, params: any, headers?:any): Promise<any> => {
  console.log(111111111, reqUrl, params);
  try {
    const result = await axios({
      url: reqUrl,
      method: 'GET',
      headers,
      responseType: 'json',
      params,
    });
    return [ null, result && result.data ? result.data : result ];
    // return result && result.data ? result.data : result;
  } catch (error) {
    logger.error(error);
    return [ error ];
  }
};
