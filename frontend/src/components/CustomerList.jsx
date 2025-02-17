import { useEffect, useState } from "react";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3012/groceries/customers/getAll")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.data) {
                    setCustomers(data.data); // Accede a 'data' para obtener los clientes
                } else {
                    setError(data.message || "No customers available");
                }
            })
            .catch((error) => {
                console.error("Error al obtener clientes:", error);
                setError("Error al obtener clientes.");
            });
    }, []);

    return (
        <div>
            <h2>Lista de Clientes</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {customers.length > 0 ? (
                    customers.map((customer) => (
                        <li key={customer._id}>
                            {customer.Name} {customer.Last_Name} - {customer.Email}
                        </li>
                    ))
                ) : (
                    <p>No hay clientes registrados.</p>
                )}
            </ul>
        </div>
    );
}

export default CustomerList;
