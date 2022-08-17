let user = require ('../data/models/User');

const userLoggedMiddleware = (req, res, next) => {
 //console.log('middleware'); -- debug
   res.locals.isLogged = false;

   let userCookie = req.cookies.usernameCookie;
   let userStored = user.findByField('username', userCookie);

  if (userStored ){
    req.session.userLogged = userStored
  }

   if(req.session.userLogged){
     res.locals.isLogged = true;
     res.locals.userLogged = req.session.userLogged;
     } 



    next();
}

module.exports = userLoggedMiddleware;