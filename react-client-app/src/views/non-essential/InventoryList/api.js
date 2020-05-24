import axios from 'src/utils/axios';
import * as dummyUrls from './dummyUrls';
import * as realUrls from './constants';

const urls = dummyUrls;

export const getProducts = async () => {
  try {
    const response = await axios.get(urls.getProductsUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = axios.post(urls.deleteProductUrl, {
      id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (id) => {
  try {
    return axios.post(urls.addProductUrl, {
      id,
    });
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id) => {
  try {
    return axios.post(urls.updateProductUrl, {
      id,
    });
  } catch (error) {
    throw error;
  }
};
