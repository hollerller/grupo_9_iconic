function notFound (req,res,next){
    res.status(404).render('404-page');
    next()
}
module.exports = notFound;
