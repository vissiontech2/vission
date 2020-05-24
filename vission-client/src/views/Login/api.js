import { post } from '../../utils/requestHandler';
import { authenticationBaseUrl } from '../../utils/baseUrls';


export const login = async (userInfo) => {
  try {
    return post(`${authenticationBaseUrl()}/login`, userInfo);
  } catch (error) {
    throw error;
  }
};
