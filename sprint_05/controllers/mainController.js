const mainController = {
    home: (request, response) => {
       // console.log(request.session.userLogged);
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
    }//,
    //editProducts: (request, response) => {
    //    response.render('editProducts')
    //}
}

module.exports = mainController;