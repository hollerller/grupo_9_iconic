//let user = require ('../data/models/User');
const db = require('../database/models');



const userLoggedMiddleware = (req, res, next) => {
 //console.log('middleware'); -- debug
   res.locals.isLogged = false;

   let userCookie = req.cookies.usernameCookie;
   if(userCookie != undefined && req.session.userLogged == undefined){
   db.User.findOne({
    where: {
        email: userCookie
    }
}).then(usuario => {
  req.session.userLogged = usuario


  if (usuario){
    req.session.userLogged = usuario
  }

})
} 

   if(req.session.userLogged){
     res.locals.isLogged = true;
     res.locals.userLogged = req.session.userLogged;
     } 

    next();
}


module.exports = userLoggedMiddleware;