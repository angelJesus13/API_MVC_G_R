import {Router} from 'express'
import customersController from '../controllers/customers.controller.js';

const router = Router();

router.get('/getAll',customersController.getAll)
router.get('/getOne/:customer_number',customersController.getOne)
router.post('/insert', customersController.insert);
router.post('/updateOne/:customer_number', customersController.updateOne);
router.get('/deleteOne/:customer_number', customersController.deleteOne);

export default router;