const userLoggedMiddleware = (req, res, next) => {
   res.locals.isLogged = false;
   if(req.session.userLogged){
     return res.locals.isLogged = true;
   }

    next();
}

module.exports = userLoggedMiddleware;