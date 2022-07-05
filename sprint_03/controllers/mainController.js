const mainController = {
    home: (request, response) => {
        response.render('home')
    },
    login: (request, response) => {
        response.render('login')
    },
    register: (request, response) => {
        response.render('register')
    },
    productDetail: (request,response) => {
        response.render('productDetail')
    },
    shoppingCart:  (request, response) => {
        response.render('shoppingCart')
    },
    edicionDeProds: (request, response) => {
        response.render('edicionDeProds')
    }
}

module.exports = mainController;