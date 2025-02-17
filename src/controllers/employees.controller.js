import employeesDAO from "../dao/employees.dao.js";

const employeesController = {};

employeesController.getAll = (req, res) => {
    employeesDAO.getAll()
    .then((employees) => {
        res.json({
            data: employees  // Corregido para acceder correctamente a la data de los empleados
        });
    })
    .catch((error) => {
        res.json({
            data: {
                "message": error
            }
        });
    });
};

employeesController.getOne = (req, res) => {
    employeesDAO.getOne(req.params.employee_number)
    .then((employee) => {
        if (employee != null) {
            res.json({ data: employee });
        } else {
            res.json({ data: { message: 'Employee not found' } });
        }
    })
    .catch((error) => {
        res.json({
            data: {
                "message": error
            }
        });
    });
};

employeesController.insert = (req, res) => {
    employeesDAO.insert(req.body)
        .then((response) => {
            res.json({ message: 'Employee inserted successfully', employee: response });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while inserting employee.',
                },
            });
        });
};

employeesController.updateOne = (req, res) => {
    employeesDAO.updateOne(req.body, req.params.employee_number)
    .then((result) => {
        res.json({
            data: {
                message: 'Employee updated successfully',
                result: result
            }
        });
    })
    .catch((error) => {
        res.json({
            data: {
                message: error.message || 'Some error occurred while updating employee.'
            }
        });
    });
};

employeesController.deleteOne = (req, res) => {
    employeesDAO.deleteOne(req.params.employee_number)
    .then((result) => {
        res.json({
            data: {
                message: 'Employee deleted successfully',
                result: result
            }
        });
    })
    .catch((error) => {
        res.json({
            data: {
                message: error.message || 'Some error occurred while deleting employee.'
            }
        });
    });
};

export default employeesController;
