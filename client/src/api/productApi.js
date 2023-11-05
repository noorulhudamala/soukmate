import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};