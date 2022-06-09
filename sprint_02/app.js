// librerías, módulos, variables

const express = require('express');
const app = express();

const path = require('path');


// configuración

app.use(express.static('public')); //llamar la carpeta public

// rutas

app.get('/home', (request, response) => {
    response.sendFile(path.join(__dirname, "./views/home.html"))
});

app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, "./views/login.html"))
});

app.get('/productDetail', (request, response) => {
    response.sendFile(path.join(__dirname, "./views/productDetail.html"))
});

app.get('/register', (request, response) => {
    response.sendFile(path.join(__dirname, "./views/register.html"))
});

app.get('/shoppingCart', (request, response) => {
    response.sendFile(path.join(__dirname, "./views/shoppingCart.html"))
});

// levantar el servidor

app.listen(3000, () => {
    console.log('Server Running');
})