import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    barcode: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    stock: { type: Number, required: true },
    expire_date: { type: String, required: true }, 
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
