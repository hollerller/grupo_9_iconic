const guestMiddleware = (req,res,next)=>{
    if(req.session.userLogged){
        return res.render('userDetail', 
       {usuario: req.session.userLogged});
    }
    next()
};
module.exports = guestMiddleware;