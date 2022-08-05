const authMiddleware = (req,res,next)=>{
    if(!req.session.userLogged){
        return res.redirect('/users/çlogin');
    }
    next()
}
module.exports=authMiddleware;