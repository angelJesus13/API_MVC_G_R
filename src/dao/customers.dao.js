import Customer from "../models/Customer.js";

const customersDAO={}

customersDAO.getAll=async()=>{
    return await Customer.find()
}

customersDAO.getOne = async(customer_number)=>{
    return await Customer.findOne({customer_number:customer_number})
}

customersDAO.insert = async (customer) => {
    return await Customer.create(customer);
};

customersDAO.updateOne = async (customer, customer_number) => {
    return await Customer.findOneAndUpdate({ customer_number: customer_number }, customer);
};

customersDAO.deleteOne = async (customer_number) => {
    return await Customer.findOneAndDelete({ customer_number: customer_number });
};

export default customersDAO