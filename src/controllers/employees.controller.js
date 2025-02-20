import employeesDAO from "../dao/employees.dao.js";

const employeesController = {};

// Obtener todos los empleados
employeesController.getAll = (req, res) => {
    employeesDAO.getAll()
        .then((employees) => {
            if (employees && employees.length > 0) {
                res.json({ data: employees });
            } else {
                res.json({ data: [], message: 'No employees found' });
            }
        })
        .catch((error) => {
            res.json({ data: { message: error.message || 'Error retrieving employees' } });
        });
};

// Obtener un empleado por número de empleado
employeesController.getOne = (req, res) => {
    employeesDAO.getOne(req.params.employee_number)
        .then((employee) => {
            if (employee != null)
                res.json({ data: employee });
            else
                res.json({ data: { message: 'Employee not found' } });
        })
        .catch((error) => {
            res.json({ data: { message: error.message || 'Error retrieving employee' } });
        });
};

// Insertar un nuevo empleado
employeesController.insert = async (req, res) => {
    const { employee_number, name, lastname, age, email, salary } = req.body;

    // Validar que employee_number no esté vacío
    if (!employee_number || employee_number.trim() === "") {
        return res.status(400).json({ data: { message: "Employee number is required" } });
    }

    try {
        // Verificar si ya existe un empleado con ese número
        const existingEmployee = await employeesDAO.getOne(employee_number);
        if (existingEmployee) {
            return res.status(400).json({ data: { message: "Employee with this number already exists" } });
        }

        const response = await employeesDAO.insert(req.body);
        res.json({
            data: "Employee inserted successfully",
            employee: response,
        });
    } catch (error) {
        res.json({
            data: { message: error.message || 'Error inserting employee' },
        });
    }
};

// Actualizar un empleado
employeesController.updateOne = async (req, res) => {
    const { employee_number } = req.params;
    const updatedEmployeeData = req.body;

    // Validar que employee_number se envíe y no esté vacío
    if (!updatedEmployeeData.employee_number || updatedEmployeeData.employee_number.trim() === "") {
        return res.status(400).json({ data: { message: "Employee number is required" } });
    }
    // Impedir cambios en el employee_number
    if (updatedEmployeeData.employee_number !== employee_number) {
        return res.status(400).json({ data: { message: "Employee number cannot be changed" } });
    }

    try {
        const result = await employeesDAO.updateOne(updatedEmployeeData, employee_number);
        if (!result) {
            return res.json({ data: { message: "Employee not found" } });
        }
        res.json({
            data: { message: "Employee updated successfully", result: result },
        });
    } catch (error) {
        res.json({
            data: { message: error.message || 'Error updating employee' },
        });
    }
};

// Eliminar un empleado por número de empleado
employeesController.deleteOne = async (req, res) => {
    try {
        const result = await employeesDAO.deleteOne(req.params.employee_number);
        if (!result) {
            return res.status(404).json({ data: { message: "Employee not found" } });
        }
        res.json({ data: { message: "Employee deleted successfully", result: result } });
    } catch (error) {
        res.status(500).json({ data: { message: error.message || "Error deleting employee" } });
    }
};

export default employeesController;
