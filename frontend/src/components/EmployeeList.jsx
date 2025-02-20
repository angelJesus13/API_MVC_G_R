import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        fetch("http://192.168.1.98:3012/groceries/employees/getAll")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.data) {
                    setEmployees(data.data);
                }
            })
            .catch((error) => {
                console.error("Error al obtener empleados:", error);
            });
    };

    const handleDeleteEmployee = async (employeeNumber) => {
        if (!window.confirm("¿Estás seguro que quieres eliminar al empleado?")) return;
        try {
            const response = await fetch(`http://192.168.1.98:3012/groceries/employees/deleteOne/${employeeNumber}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                alert("Empleado eliminado correctamente");
                fetchEmployees();
            } else {
                alert(data.data?.message || "Error al eliminar el empleado");
            }
        } catch (error) {
            console.error("Error al eliminar el empleado:", error);
            alert("Error al eliminar el empleado");
        }
    };

    return (
        <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen text-white p-6">
            <div className="flex p-6 space-x-6">
                {/* Columna de la lista */}
                <div className="flex-1">
                    <h2 className="text-7xl font-bold text-white mb-4">Lista de Empleados</h2>
                    <button
                        onClick={() => setEmployeeToEdit(null)}
                        className="text-white bg-yellow-600 rounded-lg px-6 py-2 hover:bg-yellow-500 transition duration-300 mb-4"
                    >
                        Agregar Empleado
                    </button>
                    <ul className="space-y-4">
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <li key={employee._id} className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow">
                                    <div className="text-green-800">
                                        <p className="font-semibold">{employee.name} {employee.lastname}</p>
                                        <p>Número de Empleado: {employee.employee_number}</p>
                                        <p>Email: {employee.email}</p>
                                        <p>Salario: ${employee.salary}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => setEmployeeToEdit(employee)}
                                            className="text-white bg-yellow-600 rounded-lg px-4 py-2 hover:bg-yellow-500 transition duration-300"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteEmployee(employee.employee_number)}
                                            className="text-white bg-red-600 rounded-lg px-4 py-2 hover:bg-red-500 transition duration-300 ml-2"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-white">No hay empleados registrados.</p>
                        )}
                    </ul>
                </div>

                {/* Columna del formulario (único) */}
                <div className="flex-1">
                    <EmployeeForm employeeToEdit={employeeToEdit} onSave={fetchEmployees} />
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;
