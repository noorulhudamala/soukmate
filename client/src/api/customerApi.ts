import axios from 'axios';

// export const createUser = async (userData) => {
//   try {
//     const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const login = async (userData) => {
//   try {
//     const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const sendOtp = async (email: string) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/customers/sendOtp`, {
      email: email
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (email: string, code: string) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/customers/verifyOtp`, {
      email: email,
      code: code
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

