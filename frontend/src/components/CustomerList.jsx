import React, { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [customerToEdit, setCustomerToEdit] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch("http://10.10.60.7:3012/groceries/customers/getAll")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.data) {
                    setCustomers(data.data);
                } else {
                    setError(data.message || "No hay clientes disponibles");
                }
            })
            .catch((error) => {
                console.error("Error al obtener clientes:", error);
                setError("Error al obtener clientes.");
            });
    };

    const handleDeleteCustomer = async (customer_number) => {
        if (!window.confirm("¿Estás seguro que quieres eliminar el cliente?")) {
            return;
        }
        try {
            const response = await fetch(`http://10.10.60.7:3012/groceries/customers/deleteOne/${customer_number}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                alert("Cliente eliminado correctamente");
                fetchCustomers();
            } else {
                alert(data.data?.message || "Error al eliminar el cliente");
            }
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            alert("Error al eliminar el cliente");
        }
    };

    return (
        <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen text-white">
            <div className="flex p-6 space-x-6">
                <div className="flex-1">
                    <h2 className="text-7xl font-bold text-white mb-4">Lista de Clientes</h2>
                    <ul className="space-y-4">
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <li key={customer._id} className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow">
                                    <div className="text-green-800">
                                        <p className="font-semibold">{customer.name} {customer.lastname}</p>
                                        <p>Número de Cliente: {customer.customer_number}</p>
                                        <p>Correo Electrónico: {customer.email}</p>
                                        <p>Teléfono: {customer.telephone}</p>
                                        <p>Edad: {customer.age}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => setCustomerToEdit(customer)}
                                            className="btn btn-yellow text-white bg-yellow-600 rounded-lg px-4 py-2 hover:bg-yellow-500 transition duration-300"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCustomer(customer.customer_number)}
                                            className="btn btn-red ml-2 text-white bg-red-600 rounded-lg px-4 py-2 hover:bg-red-500 transition duration-300"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-white">No hay clientes registrados.</p>
                        )}
                    </ul>
                </div>
                <div className="flex-1">
                    <CustomerForm customerToEdit={customerToEdit} onSave={fetchCustomers} />
                </div>
            </div>
        </div>
    );
}

export default CustomerList;
