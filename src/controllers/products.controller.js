import productsDAO from "../dao/products.dao.js";
import moment from "moment-timezone";

const productsController = {};

// Obtener todos los productos
productsController.getAll = (req, res) => {
    productsDAO.getAll()
        .then((products) => {
            if (products && products.length > 0) {
                res.json({ data: products });
            } else {
                res.json({ data: [], message: 'No products found' });
            }
        })
        .catch((error) => {
            res.json({
                data: [],
                message: error.message || 'Error retrieving products'
            });
        });
};

// Obtener un producto por código de barras
productsController.getOne = (req, res) => {
    productsDAO.getOne(req.params.barcode)
        .then((product) => {
            if (product != null)
                res.json({ data: product });
            else
                res.json({ data: { message: 'Product not found' } });
        })
        .catch((error) => {
            res.json({
                data: {
                    "message": error
                }
            });
        });
};

productsController.insert = async (req, res) => {
    const { barcode, description, brand, price, expire_date, stock } = req.body;

    // Verificar que barcode no sea vacío ni nulo
    if (!barcode || barcode.trim() === "") {
        return res.status(400).json({ data: { message: "Barcode is required" } });
    }

    // Verificar si expire_date está presente y es válido
    if (!expire_date || expire_date.trim() === "") {
        return res.status(400).json({ data: { message: "Expire date is required" } });
    }

    try {
        // Convierte la fecha expire_date a la zona horaria Central Mexico (CST)
        const parsedExpireDate = moment.tz(expire_date, "America/Mexico_City").toDate();

        // Verifica si la fecha es válida
        if (isNaN(parsedExpireDate)) {
            return res.status(400).json({ data: { message: "Invalid expire date" } });
        }

        // Formatear la fecha a "Mes Día, Año" (por ejemplo: Dec 12, 2029)
        req.body.expire_date = moment(parsedExpireDate).format("MMM DD, YYYY");

        const response = await productsDAO.insert(req.body);
        res.json({
            data: "Product inserted successfully",
            product: response,
        });
    } catch (error) {
        res.json({
            data: {
                message: error.message || 'Error inserting product',
            },
        });
    }
};

// Actualizar un producto por código de barras
productsController.updateOne = async (req, res) => {
    const { barcode } = req.params;
    const updatedProductData = req.body;
    
    // Evitar cambios en el barcode
    if (updatedProductData.barcode && updatedProductData.barcode !== barcode) {
        return res.status(400).json({
            data: { message: "Barcode cannot be changed" },
        });
    }

    // Asegurarse de que expire_date sea válido en la actualización
    if (!updatedProductData.expire_date || updatedProductData.expire_date.trim() === "") {
        return res.status(400).json({
            data: { message: "Expire date is required" },
        });
    }

    try {
        // Convierte la fecha expire_date a la zona horaria Central Mexico (CST)
        const parsedExpireDate = moment.tz(updatedProductData.expire_date, "America/Mexico_City").toDate();

        if (isNaN(parsedExpireDate)) {
            return res.status(400).json({ data: { message: "Invalid expire date" } });
        }

        // Formatear la fecha a "Mes Día, Año"
        updatedProductData.expire_date = moment(parsedExpireDate).format("MMM DD, YYYY");

        const result = await productsDAO.updateOne(updatedProductData, barcode);
        if (!result) {
            return res.json({ data: { message: "Product not found" } });
        }

        res.json({
            data: { message: 'Product updated successfully', result: result },
        });
    } catch (error) {
        res.json({
            data: { message: error.message || 'Error updating product' },
        });
    }
};

// Eliminar un producto por código de barras
productsController.deleteOne = async (req, res) => {
    const { barcode } = req.params;

    try {
        const deletedProduct = await productsDAO.deleteOne(barcode);
        
        if (!deletedProduct) {
            return res.status(404).json({ data: { message: "Product not found" } });
        }

        res.json({ data: { message: "Product deleted successfully", deletedProduct } });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ data: { message: error.message || "Error deleting product" } });
    }
};

// Verificar si el código de barras ya existe
productsController.checkBarcodeExists = async (req, res) => {
    const { barcode } = req.params;

    try {
        const product = await productsDAO.getOne(barcode);

        if (product) {
            return res.json({ exists: true, message: "Este código de barras ya existe." });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error verificando código de barras:", error);
        return res.status(500).json({ error: "Error en la validación" });
    }
};

export default productsController;
