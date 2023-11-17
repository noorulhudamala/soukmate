import axios from 'axios';

export const getProductInventory = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product-inventory/${id}`);
    return response.data;
  } catch (error) {
      console.log("====err", error)
    throw error;
  }
};