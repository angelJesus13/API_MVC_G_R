import productsDAO from "../dao/products.dao.js";

const productsController = {};

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

productsController.getOne = (req,res)=>{
    productsDAO.getOne(req.params.barcode)
    .then((product)=>{
        if(product != null)
            res.json({data:product})
        else
            res.json({data:{message:'Product not found'}})
    })
    .catch((error)=>{
        res.json({
            data:{
                "message":error
            }
        })
    }) 
}

productsController.insert = async (req, res) => {
    const { barcode, description, brand, price, expire_date, stock } = req.body;

    // Verificar que barcode no sea vacío ni nulo
    if (!barcode || barcode.trim() === "") {
        return res.status(400).json({ data: { message: "Barcode is required" } });
    }

    try {
        // Verificar si ya existe un producto con el mismo barcode
        const existingProduct = await productsDAO.getOne(barcode);
        if (existingProduct) {
            return res.status(400).json({ data: { message: "Product with this barcode already exists" } });
        }

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



productsController.updateOne = async (req, res) => {
    const { barcode } = req.params;
    const updatedProductData = req.body;
    
    // Evitar cambios en el barcode
    if (updatedProductData.barcode && updatedProductData.barcode !== barcode) {
        return res.status(400).json({
            data: { message: "Barcode cannot be changed" },
        });
    }

    try {
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


export default productsController;
