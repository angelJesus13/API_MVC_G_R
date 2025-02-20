import { useState, useEffect } from "react";

const CustomerForm = ({ customerToEdit, onSave }) => {
    const [customer, setCustomer] = useState({
        customer_number: "",
        name: "",
        lastname: "",
        age: "",
        email: "",
        telephone: "",
    });

    useEffect(() => {
        if (customerToEdit) {
            setCustomer({ ...customerToEdit });
        }
    }, [customerToEdit]);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación: No permitir que customer_number sea vacío
        if (!customer.customer_number || customer.customer_number.trim() === "") {
            return alert("El número de cliente es obligatorio.");
        }

        // Validación: Verificar que el correo electrónico tenga el formato correcto
        if (customer.email && !/\S+@\S+\.\S+/.test(customer.email)) {
            return alert("El correo electrónico no tiene un formato válido.");
        }

        try {
            const method = customerToEdit ? "PUT" : "POST";
            const endpoint = customerToEdit
                ? `http://192.168.1.98:3012/groceries/customers/updateOne/${customer.customer_number}`
                : "http://192.168.1.98:3012/groceries/customers/insert";

            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer),
            });

            const data = await response.json();

            if (data.data?.message) {
                alert(data.data.message);
            } else {
                alert("Cliente guardado correctamente");
            }

            onSave();
            handleClear();
        } catch (error) {
            alert("Error guardando el cliente: " + error.message);
        }
    };

    const handleClear = () => {
        setCustomer({
            customer_number: "",
            name: "",
            lastname: "",
            age: "",
            email: "",
            telephone: "",
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-blue-600 p-8 rounded-xl shadow-2xl text-white">
                <h2 className="text-3xl font-extrabold text-white mb-6 uppercase text-center">
                    {customerToEdit ? "Editar Cliente" : "Agregar Cliente"}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { name: "customer_number", label: "Número de Cliente" },
                        { name: "name", label: "Nombre" },
                        { name: "lastname", label: "Apellido" },
                        { name: "age", label: "Edad" },
                        { name: "email", label: "Correo Electrónico" },
                        { name: "telephone", label: "Teléfono" },
                    ].map(({ name, label }, index) => (
                        <div key={index} className="text-left">
                            <label className="block text-white font-semibold mb-1">{label}:</label>
                            <input
                                type={name === "age" || name === "telephone" ? "number" : "text"}
                                name={name}
                                placeholder={label}
                                value={customer[name]}
                                onChange={handleChange}
                                className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mt-6">
                    <button type="submit" className="btn btn-green text-white bg-green-700 rounded-lg px-6 py-2 hover:bg-green-600 transition duration-300">
                        {customerToEdit ? "Actualizar" : "Guardar"} Cliente
                    </button>
                    <button type="button" onClick={handleClear} className="btn btn-gray text-white bg-gray-600 rounded-lg px-6 py-2 hover:bg-gray-500 transition duration-300">
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
