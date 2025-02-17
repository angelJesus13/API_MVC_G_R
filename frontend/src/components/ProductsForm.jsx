import { useState, useEffect } from "react";

const ProductsForm = ({ productToEdit, onSave }) => {
    const [product, setProduct] = useState({
        barcode: "",
        description: "",
        brand: "",
        price: "",
        cost: "",
        expire_date: "",
        stock: "",
    });

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.barcode.trim()) return alert("Barcode is required");

        try {
            const method = productToEdit ? "PUT" : "POST";
            const endpoint = productToEdit
                ? `http://localhost:3012/groceries/products/update/${product.barcode}`
                : "http://localhost:3012/groceries/products/insert";

            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });

            const data = await response.json();
            alert(data.data.message || "Product saved successfully");
            onSave();
            handleClear();
        } catch (error) {
            alert("Error saving product: " + error.message);
        }
    };

    const handleClear = () => {
        setProduct({
            barcode: "",
            description: "",
            brand: "",
            price: "",
            cost: "",
            expire_date: "",
            stock: "",
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-md bg-blue-600 p-8 rounded-xl shadow-2xl text-white"
            >
                <h2 className="text-3xl font-extrabold text-white mb-6 uppercase text-center">
                    {productToEdit ? "Editar Producto" : "Agregar Producto"}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { name: "barcode", label: "Código de Barras" },
                        { name: "description", label: "Descripción" },
                        { name: "brand", label: "Marca" },
                        { name: "price", label: "Precio" },
                        { name: "cost", label: "Costo" },
                        { name: "expire_date", label: "Fecha de Expiración" },
                        { name: "stock", label: "Stock" },
                    ].map(({ name, label }, index) => (
                        <div key={index} className="text-left">
                            <label className="block text-white font-semibold mb-1">{label}:</label>
                            <input
                                type={name === "price" || name === "cost" || name === "stock" ? "number" : name === "expire_date" ? "date" : "text"}
                                name={name}
                                placeholder={label}
                                value={product[name]}
                                onChange={handleChange}
                                className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mt-6">
                    <button type="submit" className="btn btn-green text-white bg-green-700 rounded-lg px-6 py-2 hover:bg-green-600 transition duration-300">
                        {productToEdit ? "Actualizar" : "Guardar"} Producto
                    </button>
                    <button type="button" onClick={handleClear} className="btn btn-gray text-white bg-gray-600 rounded-lg px-6 py-2 hover:bg-gray-500 transition duration-300">
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductsForm;
