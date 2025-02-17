import { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch("http://localhost:3012/groceries/products/getAll")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.data) {
                    setProducts(data.data);
                } else {
                    setError(data.message || "No products available");
                }
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
                setError("Error al obtener productos.");
            });
    };

    return (
        <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen text-white">
            <div className="flex p-6 space-x-6">
                <div className="flex-1">
                    <h2 className="text-7xl font-bold text-white mb-4">Lista de Productos</h2>
                    <ul className="space-y-4">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <li key={product._id} className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow">
                                    <div className="text-green-800">
                                        <p className="font-semibold">{product.name}</p>
                                        <p>Precio: ${product.price}</p>
                                        <p>Marca: {product.brand}</p>
                                        <p>Stock: {product.stock}</p>
                                        <p>Código de Barras: {product.barcode}</p>
                                    </div>
                                    <div>
                                        <button 
                                            onClick={() => setProductToEdit(product)} 
                                            className="btn btn-yellow text-white bg-yellow-600 rounded-lg px-4 py-2 hover:bg-yellow-500 transition duration-300">
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteProduct(product.barcode)} 
                                            className="btn btn-red ml-2 text-white bg-red-600 rounded-lg px-4 py-2 hover:bg-red-500 transition duration-300">
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-white">No hay productos registrados.</p>
                        )}
                    </ul>
                </div>
                <div className="flex-1">
                    <ProductsForm productToEdit={productToEdit} onSave={fetchProducts} />
                </div>
            </div>
        </div>
    );
}

export default ProductsList;
