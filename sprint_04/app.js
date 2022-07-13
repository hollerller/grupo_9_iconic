// librerías, módulos, variables

const express = require('express');
const app = express();

const path = require('path');


// configuración

app.use(express.static('public')); //llamar la carpeta public

//requiriendo mainRouter
const mainRouter = require('./routes/mainRouter');
const productRouter = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
// rutas

app.get('/',mainRouter);

app.get('/login',mainRouter );

app.get('/productDetail',mainRouter);

app.get('/register',mainRouter);

app.get('/shoppingCart',mainRouter);

app.get('/edicionDeProds',mainRouter);

app.get('/products/:id?', productRouter);

app.get('/user/:id?', userRoutes);

//Configuración EJS
app.set('view engine','ejs');


// levantar el servidor

app.listen(3000, () => {
    console.log('Server Running');
})