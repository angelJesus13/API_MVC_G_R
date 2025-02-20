import Customer from "../models/Customer.js";

const customersDAO = {};

customersDAO.getAll = async () => {
    return await Customer.find();
};

customersDAO.getOne = async (customer_number) => {
    return await Customer.findOne({ customer_number: customer_number });
};

customersDAO.insert = async (customer) => {
    try {
        const existingCustomer = await Customer.findOne({ customer_number: customer.customer_number });
        if (existingCustomer) {
            throw new Error('El número de cliente ya existe.');
        }
        return await Customer.create(customer);
    } catch (error) {
        throw error;
    }
};

customersDAO.updateOne = async (customer, customer_number) => {
    return await Customer.findOneAndUpdate({ customer_number: customer_number }, customer, { new: true });
};

customersDAO.deleteOne = async (customer_number) => {
    return await Customer.findOneAndDelete({ customer_number: customer_number });
};

export default customersDAO;
