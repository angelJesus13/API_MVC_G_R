    import {Router} from 'express'
    import employeesController from '../controllers/employees.controller.js';

    const router = Router();

    router.get('/getAll',employeesController.getAll)
    router.get('/getOne/:employee_number',employeesController.getOne)
    router.post('/insert', employeesController.insert)
    router.post('/updateOne/:employee_number', employeesController.updateOne)
    router.get('/deleteOne/:employee_number', employeesController.deleteOne)

    export default router;