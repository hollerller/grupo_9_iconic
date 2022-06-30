// librerías, módulos, variables

const express = require('express');
const app = express();

const path = require('path');


// configuración

app.use(express.static('public')); //llamar la carpeta public

//requiriendo mainRouter
const mainRouter = require('./routes/mainRouter');
// rutas

app.get('/',mainRouter);

app.get('/login',mainRouter );

app.get('/productDetail',mainRouter);

app.get('/register',mainRouter);

app.get('/shoppingCart',mainRouter);

//Configuración EJS
app.set('view engine','ejs');


// levantar el servidor

app.listen(3000, () => {
    console.log('Server Running');
})