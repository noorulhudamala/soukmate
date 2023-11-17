import axios from 'axios';

export const getSizes = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/sizes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};