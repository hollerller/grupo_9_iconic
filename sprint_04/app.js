// librerías, módulos, variables
const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE



// configuración

app.use(express.static('public')); //llamar la carpeta public
app.use(express.urlencoded({ extended: false }));//Para capturar informacion
app.use(express.json()); //Para capturar info
app.use(methodOverride('_method'));

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

//configurando ruta hacia products
app.use('/products',productsRouter)

app.get('/serie/:id', (req, res) => {
    let idSerie = req.params.id;
    

/* --------------------------- *//*prueba ejercicio playground *//* --------------------------- */
    let serie = series.find(item => item.id == idSerie);
    res.send(serie.name);
    }
)

let series = [ { "id": 1, "name": "Friends" }, { "id": 2, "name": "Breaking Bad" }, { "id": 3, "name": "Dexter" }, { "id": 4, "name": "Six Feet Under" } ]
console.log (series);
let serienoJSON = JSON.stringify(series);
console.log(serienoJSON)
/* --------------------------- *//* --------------------------- *//* --------------------------- */

app.use('/users', userRoutes);

//Configuración EJS
app.set('view engine','ejs');



// levantar el servidor

app.listen(3000, () => {
    console.log('Server Running');
})