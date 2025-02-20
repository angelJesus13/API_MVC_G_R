import { useState } from "react";
import ProductList from "./components/ProductList"; // Para los productos
import EmployeeList from "./components/EmployeeList"; // Para los empleados
import CustomerList from "./components/CustomerList"; // Para los clientes
import './App.css'; // Tailwind importado

function App() {
    const [view, setView] = useState("products"); // Vista actual

    return (
        <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen text-white">
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-extrabold text-center text-white mb-6">
                    Gestión de Tienda
                </h1>

                {/* Navbar */}
                <nav className="flex justify-center gap-6 mb-6">
                    <button
                        onClick={() => setView("products")}
                        className="px-6 py-2 text-xl font-semibold text-white bg-green-800 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Productos
                    </button>
                    <button
                        onClick={() => setView("employees")}
                        className="px-6 py-2 text-xl font-semibold text-white bg-yellow-600 rounded-lg hover:bg-yellow-500 transition duration-300"
                    >
                        Empleados
                    </button>
                    <button
                        onClick={() => setView("customers")}
                        className="px-6 py-2 text-xl font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500 transition duration-300"
                    >
                        Clientes
                    </button>
                </nav>

                {/* Vistas */}
                {view === "products" && <ProductList />}
                {view === "employees" && <EmployeeList />}
                {view === "customers" && <CustomerList />}
            </div>
        </div>
    );
}

export default App;
