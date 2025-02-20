import axios from "axios";

const API_URL = "http://10.10.60.7:3012/groceries/customers";

export const getCustomers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
