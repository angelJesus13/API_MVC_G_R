import { useEffect, useState } from "react";
import { getEmployees } from "../api/employees";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3012/groceries/employees")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.data) {
                    setEmployees(data.data); // Accede a 'data' para obtener los empleados
                } else {
                    setError(data.message || "No employees available");
                }
            })
            .catch((error) => {
                console.error("Error al obtener empleados:", error); // Aquí se corrigió el error tipográfico
                setError("Error al obtener empleados.");
            });
    }, []);

    return (
        <div>
            <h2>Lista de Empleados</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <li key={employee._id}>
                            {employee.name} - {employee.position}
                        </li>
                    ))
                ) : (
                    <p>No hay empleados registrados.</p>
                )}
            </ul>
        </div>
    );
}

export default EmployeeList;
