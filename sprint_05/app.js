// librerías, módulos, variables
const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require('express-session');

//Llamando a los middlewares a nivel global
const errorMiddleware = require('./middlewares/error')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

// configuración

app.use(express.static('public')); //llamar la carpeta public
app.use(express.urlencoded({ extended: false }));//Para capturar informacion
app.use(express.json()); //Para capturar info
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Secret Word',
    resave : false,
    saveUninitialized:false
}))

//Configuración EJS
app.set('view engine','ejs');

//requiriendo los routers
const mainRouter = require('./routes/mainRouter');
const userRoutes = require('./routes/userRoutes');
const productsRouter = require('./routes/productRoutes');
// rutas

app.use('/',mainRouter);

//app.use('/login',mainRouter );

app.use('/productDetail',mainRouter);

//app.use('/register',mainRouter);

app.use('/shoppingCart',mainRouter);

//configurando ruta hacia products
app.use('/products',productsRouter)

//Confiurando ruta hacia users
app.use('/users', userRoutes);

//Configurando miiddleware error 404 notfound
app.use(errorMiddleware);

// Middleware de sesion de usuario loggeado
app.use(userLoggedMiddleware);
// levantar el servidor

app.listen(3000, () => {
    console.log('Server Running');
})