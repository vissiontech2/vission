import mockAxios from 'src/utils/axios';
import axios from 'axios';
import { purchasesBaseUrl } from '../../utils/baseUrls';


const Api = mockAxios || axios;

// twice
export const getAllSuppliers = async () => {
  try {
    return Api.get(`${purchasesBaseUrl()}/suppliers`);
  } catch (error) {
    throw error;
  }
};

// once
export const getSupplierSummary = async (data) => {
  try {
    return Api.get(`${purchasesBaseUrl()}/summary`, data);
  } catch (error) {
    throw error;
  }
};

export const getSupplierInvoices = async (data) => {
  try {
    return Api.get(`${purchasesBaseUrl()}/invoices`, data);
  } catch (error) {
    throw error;
  }
};

export const getSupplierPayables = async (data) => {
  try {
    return Api.get(`${purchasesBaseUrl()}/payables`, data);
  } catch (error) {
    throw error;
  }
};

export const editPayable = async (data) => {
  try {
    Api.post(`${purchasesBaseUrl()}/payables/edit`, data);
  } catch (error) {
    throw error;
  }
};

export const payPayable = async (data) => {
  try {
    return Api.post(`${purchasesBaseUrl()}/payables/payment`, data);
  } catch (error) {
    throw error;
  }
};


export const getAllPurchases = async () => {
  try {
    const response = Api.get(`${purchasesBaseUrl()}/purchases`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPurchaseDetails = async (data) => {
  try {
    return Api.get(`${purchasesBaseUrl()}/purchaseDetails`, data);
  } catch (error) {
    throw error;
  }
};

export const createPurchase = async (order) => {
  try {
    return Api.post(`${purchasesBaseUrl()}/newPurchase`, order);
  } catch (error) {
    throw error;
  }
};


export const createSupplier = async (data) => {
  try {
    return Api.post(`${purchasesBaseUrl()}/newSupplier`, data);
  } catch (error) {
    throw error;
  }
};

export const editSupplier = async (data) => {
  try {
    return Api.post(`${purchasesBaseUrl()}/suppliers/edit`, data);
  } catch (error) {
    throw error;
  }
};


export const getInventory = async () => {
  try {
    return Api.get(`${purchasesBaseUrl()}/inventory`);
  } catch (error) {
    throw error;
  }
};
