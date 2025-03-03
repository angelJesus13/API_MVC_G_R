import {Router} from 'express'
import productsController from '../controllers/products.controller.js';

const router = Router();

router.get('/getAll',productsController.getAll)
router.get('/getOne/:barcode',productsController.getOne)
router.post('/insert',productsController.insert)
router.put('/update/:barcode', productsController.updateOne);
router.delete('/deleteOne/:barcode', productsController.deleteOne);
//nueva ruta para el barcode+
router.get("/check/:barcode", productsController.checkBarcodeExists);
export default router;