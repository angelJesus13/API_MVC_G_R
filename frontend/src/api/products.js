import axios from "axios";

const API_URL = "http://192.168.1.98:3012/groceries/products";

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
