import React, { useState, useEffect } from "react";

const EmployeeForm = ({ employeeToEdit, onSave, onClose }) => {
    const [employee, setEmployee] = useState({
        employee_number: "",
        name: "",
        lastname: "",
        age: "",
        email: "",
        salary: "",
    });

    useEffect(() => {
        if (employeeToEdit) {
            setEmployee(employeeToEdit);
        } else {
            setEmployee({
                employee_number: "",
                name: "",
                lastname: "",
                age: "",
                email: "",
                salary: "",
            });
        }
    }, [employeeToEdit]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !employee.employee_number ||
            !employee.name ||
            !employee.lastname ||
            !employee.age ||
            !employee.email ||
            !employee.salary
        ) {
            return alert("Todos los campos son obligatorios.");
        }

        try {
            const method = employeeToEdit ? "PUT" : "POST";
            const endpoint = employeeToEdit
                ? `http://10.10.60.7:3012/groceries/employees/update/${employee.employee_number}`
                : "http://10.10.60.7:3012/groceries/employees/insert";

            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employee),
            });

            const data = await response.json();

            if (data.data?.message) {
                alert(data.data.message);
            } else {
                alert("Empleado guardado correctamente");
            }

            onSave();
            handleClear();
        } catch (error) {
            alert("Error guardando el empleado: " + error.message);
        }
    };

    const handleClear = () => {
        setEmployee({
            employee_number: "",
            name: "",
            lastname: "",
            age: "",
            email: "",
            salary: "",
        });
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-yellow-600 p-8 rounded-xl shadow-2xl text-white">
                <h2 className="text-3xl font-extrabold text-white mb-6 uppercase text-center">
                    {employeeToEdit ? "Editar Empleado" : "Agregar Empleado"}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { name: "employee_number", label: "Número de Empleado" },
                        { name: "name", label: "Nombre" },
                        { name: "lastname", label: "Apellido" },
                        { name: "age", label: "Edad" },
                        { name: "email", label: "Email" },
                        { name: "salary", label: "Salario" },
                    ].map(({ name, label }) => (
                        <div key={name} className="text-left">
                            <label className="block text-white font-semibold mb-1">{label}:</label>
                            <input
                                type={name === "age" || name === "salary" ? "number" : "text"}
                                name={name}
                                placeholder={label}
                                value={employee[name]}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                                required
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mt-6">
                    <button type="submit" className="bg-green-700 px-6 py-2 rounded-lg text-white hover:bg-green-600 transition duration-300">
                        {employeeToEdit ? "Actualizar" : "Guardar"} Empleado
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-600 px-6 py-2 rounded-lg text-white hover:bg-gray-500 transition duration-300">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
