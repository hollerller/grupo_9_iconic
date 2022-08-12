const userLoggedMiddleware = (req, res, next) => {
  console.log('middleware');
   res.locals.isLogged = false;
   if(req.session.userLogged){
     res.locals.isLogged = true;
     res.locals.userLogged = req.session.userLogged;
     } 
    next();
}

module.exports = userLoggedMiddleware;