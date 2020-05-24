import mockAxios from 'src/utils/axios';
import axios from 'axios';
import { salesBaseUrl } from '../../utils/baseUrls';


const Api = mockAxios || axios;

// twice
export const getAllCustomers = async () => {
  try {
    return Api.get(`${salesBaseUrl()}/customers`);
  } catch (error) {
    throw error;
  }
};

// once
export const getCustomerSummary = async (data) => {
  try {
    return Api.get(`${salesBaseUrl()}/summary`, data);
  } catch (error) {
    throw error;
  }
};

export const getCustomerInvoices = async (data) => {
  try {
    return Api.get(`${salesBaseUrl()}/invoices`, data);
  } catch (error) {
    throw error;
  }
};

export const getCustomerReceivables = async (data) => {
  try {
    return Api.get(`${salesBaseUrl()}/reveivables`, data);
  } catch (error) {
    throw error;
  }
};

export const editReceivable = async (data) => {
  try {
    return Api.post(`${salesBaseUrl()}/reveivables/edit`, data);
  } catch (error) {
    throw error;
  }
};

export const payReceivable = async (data) => {
  try {
    return Api.post(`${salesBaseUrl()}/reveivables/payment`, data);
  } catch (error) {
    throw error;
  }
};


export const getAllOrders = async () => {
  try {
    return Api.get(`${salesBaseUrl()}/transactions/orders`);
  } catch (error) {
    throw error;
  }
};

export const getOrderDetail = async (data) => {
  try {
    return Api.get(`${salesBaseUrl()}/orderDetail`, data);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order) => {
  try {
    return Api.post(`${salesBaseUrl()}/newOrder`, order);
  } catch (error) {
    throw error;
  }
};


export const createCustomer = async (data) => {
  try {
    return Api.post(`${salesBaseUrl()}/newCustomer`, data);
  } catch (error) {
    throw error;
  }
};

export const editCustomer = async (data) => {
  try {
    return Api.post(`${salesBaseUrl()}/customers/edit`, data);
  } catch (error) {
    throw error;
  }
};


export const getInventory = async () => {
  try {
    return Api.get(`${salesBaseUrl()}/inventory`);
  } catch (error) {
    throw error;
  }
};

export const editTransaction = (transaction) => {
  try {
    return Api.post(`${salesBaseUrl()}/transactions/edit`, transaction);
  } catch (error) {
    throw error;
  }
};
