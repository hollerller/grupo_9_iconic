// librerías, módulos, variables

const express = require('express');
const app = express();

const path = require('path');


// configuración

app.use(express.static('public')); //llamar la carpeta public

//requiriendo los routers
const mainRouter = require('./routes/mainRouter');
const userRoutes = require('./routes/userRoutes');
const productsRouter = require('./routes/productRoutes');
// rutas

app.use('/',mainRouter);

app.use('/login',mainRouter );

app.use('/productDetail',mainRouter);

app.use('/register',mainRouter);

app.use('/shoppingCart',mainRouter);

app.use('/edicionDeProds',mainRouter);
//configurando ruta hacia products
app.use('/products',productsRouter)

//app.get('/products/:id?', productRouter);

app.use('/users', userRoutes);

//Configuración EJS
app.set('view engine','ejs');


// levantar el servidor

app.listen(3000, () => {
    console.log('Server Running');
})