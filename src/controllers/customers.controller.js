import customersDAO from "../dao/customers.dao.js";

const customersController = {};

customersController.getAll = (req, res) => {
    customersDAO.getAll()
    .then((customers) => {
        res.json({
            data: customers  // Se asegura que "data" sea lo que espera el frontend
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

customersController.getOne = (req, res) => {
    customersDAO.getOne(req.params.customer_number)
    .then((customer) => {
        if (customer != null) {
            res.json({ data: customer });
        } else {
            res.json({ data: { message: 'Customer not found' } });
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

customersController.insert = (req, res) => {
    customersDAO.insert(req.body)
        .then((response) => {
            res.json({ message: 'Customer inserted successfully', customer: response });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while inserting customer.',
                },
            });
        });
};

customersController.updateOne = (req, res) => {
    customersDAO.updateOne(req.body, req.params.customer_number)
        .then((result) => {
            res.json({
                data: {
                    message: 'Customer updated successfully',
                    result: result,
                },
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while updating customer.',
                },
            });
        });
};

customersController.deleteOne = (req, res) => {
    customersDAO.deleteOne(req.params.customer_number)
        .then((result) => {
            res.json({
                data: {
                    message: 'Customer deleted successfully',
                    result: result,
                },
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while deleting customer.',
                },
            });
        });
};

export default customersController;
