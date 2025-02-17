import Product from "../models/Product.js";

const productsDAO={}

productsDAO.getAll=async()=>{
    return await Product.find()
}

productsDAO.getOne = async(barcode)=>{
    return await Product.findOne({barcode:barcode})
}
productsDAO.insert = async(product)=>{
    return await Product.create(product)
}

productsDAO.updateOne = async (product,barcode) => {
    return await Product.findOneAndUpdate({ barcode },{ $set: product },{ new: true });	
}
productsDAO.deleteOne = async (barcode) => {
    return await Product.findOneAndDelete({barcode: barcode});
}
export default productsDAO;