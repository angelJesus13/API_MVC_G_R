import React, { useState } from 'react';

const CustomerForm = () => {
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        address: '',
    });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar la lógica para enviar los datos del cliente al servidor
        console.log(customer);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="address">Dirección:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default CustomerForm;