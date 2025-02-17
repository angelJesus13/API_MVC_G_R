import Employee from "../models/Employee.js";

const employeesDAO={}

employeesDAO.getAll=async()=>{
    return await Employee.find()
}

employeesDAO.getOne = async(employee_number)=>{
    return await Employee.findOne({employee_number:employee_number})
}

employeesDAO.insert = async (employee) => {
    return await Employee.create(employee);
};

employeesDAO.updateOne = async (employee, employee_number) => { 
    return await Employee.findOneAndUpdate({ employee_number }, employee);
};

employeesDAO.deleteOne = async(employee_number) => {
    return await Employee.findOneAndDelete({ employee_number });
}

export default employeesDAO