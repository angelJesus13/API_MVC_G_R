import express from 'express'
import morgan from 'morgan'
import productsRouter from './routes/products.routes.js'
import employeesRouter from './routes/employess.routes.js'
import customersRouter from './routes/customers.routes.js'
import cors from 'cors';

const app = express()

//Settings
app.set('port',process.env.PORT||3012)

//Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"*",
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type"]
}));
//Routes
app.use('/groceries/products',productsRouter)
app.use('/groceries/employees',employeesRouter)
app.use('/groceries/customers',customersRouter)

export default app;