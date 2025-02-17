import axios from "axios";

const API_URL = "http://10.10.60.13:3012/groceries/products";

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
