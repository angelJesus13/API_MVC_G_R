import { useState, useEffect } from "react";
import React from "react";

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

    const [error, setError] = useState("");

    useEffect(() => {
        if (productToEdit) {
            const formattedExpireDate = productToEdit.expire_date
                ? new Date(productToEdit.expire_date).toISOString().split("T")[0]
                : "";
            setProduct({
                ...productToEdit,
                expire_date: formattedExpireDate,
            });
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const checkBarcodeExists = async (barcode) => {
        try {
            const response = await fetch(`http://10.10.60.7:3012/groceries/products/check/${barcode}`);
            const data = await response.json();
            if (data.exists) {
                setError("Este código de barras ya existe, inserta uno válido.");
                return true; // El código de barras ya existe
            }
            setError(""); // Limpiar el error si no existe
            return false; // El código de barras no existe
        } catch (error) {
            console.error("Error al verificar el código de barras:", error);
            setError("Hubo un error al verificar el código de barras.");
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validación: No permitir que el barcode sea vacío
        if (!product.barcode || product.barcode.trim() === "") {
            return alert("El código de barras es obligatorio.");
        }
    
        // Verificar si el código de barras ya existe solo si no se está editando el producto
        if (!productToEdit) {
            const barcodeExists = await checkBarcodeExists(product.barcode.trim());
            if (barcodeExists) {
                return; // Si el código de barras ya existe, no proceder con el envío
            }
        }
    
        // Verificar que la fecha de caducidad esté en el formato correcto
        if (product.expire_date && isNaN(new Date(product.expire_date))) {
            return alert("La fecha de caducidad no es válida.");
        }
    
        console.log("Datos enviados: ", product);
    
        try {
            const method = productToEdit ? "PUT" : "POST";
            const endpoint = productToEdit
                ? `http://10.10.60.7:3012/groceries/products/update/${product.barcode}`
                : "http://10.10.60.7:3012/groceries/products/insert";
    
            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...product, barcode: product.barcode.trim() }),
            });
    
            const data = await response.json();
    
            if (data.data?.message) {
                alert(data.data.message);
            } else {
                alert("Producto guardado correctamente");
            }
    
            // Llamar a `onSave` para actualizar el estado y restablecer la edición
            onSave(); // Aquí restablecemos el estado de edición (en el componente padre)
            handleClear(); // Limpiar los datos del formulario
        } catch (error) {
            alert("Error guardando el producto: " + error.message);
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

                {error && (
                    <div className="text-red-500 text-center mb-4">
                        <strong>{error}</strong>
                    </div>
                )}

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
                                type={name === "price" || name === "cost" || name === "stock"
                                    ? "number"
                                    : name === "expire_date"
                                    ? "date"
                                    : "text"}
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
                    <button
                        type="submit"
                        className="btn btn-green text-white bg-green-700 rounded-lg px-6 py-2 hover:bg-green-600 transition duration-300"
                    >
                        {productToEdit ? "Actualizar" : "Guardar"} Producto
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="btn btn-gray text-white bg-gray-600 rounded-lg px-6 py-2 hover:bg-gray-500 transition duration-300"
                    >
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductsForm;
