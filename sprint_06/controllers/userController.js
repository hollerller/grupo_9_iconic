const fs = require('fs');
const path = require('path');
const User = require('../database/models/User');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');

//Validation result - Express Validator
const { validationResult } = require('express-validator');


// Multer
let usersArray = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

    // Mostrar perfil de usuario
    userID: (req, res) => {
        //console.log(req.session.userLogged);
        let userToDisplay = req.session.userLogged;
        db.User.findByPk(userToDisplay.id,{
            include:[
                {association: "roles"},
                {association: "countries"}
            ]   
        }).then(user =>{
                res.render('userDetail', {usuario: user})
            })
    },
    // Mostrar Formulario de registro

    register: (req, res) => {
        let role = db.Role.findAll();
        let country = db.Country.findAll();

        Promise.all([role, country])
            .then(function([role, country]){
            res.render('register', {
                role: role,
                country: country
            })
        })
    },

    //Procesar formulario de registro

    createUser: (req, res) => {
        const registerValidation = validationResult(req)
        console.log(req.body);

    if (registerValidation.errors.length > 0) {
        
        let role = db.Role.findAll();
        let country = db.Country.findAll();

        Promise.all([role, country])
            .then(function([role, country]){
            res.render('register', {
                registerErrors: registerValidation.mapped(),
                oldData: req.body,
                role: role,
                country: country
            })
        })
  } else {
    db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(userExists => {
            if (userExists) {

                let role = db.Role.findAll();
        let country = db.Country.findAll();

        Promise.all([role, country])
            .then(function([role, country]){

                res.render('register', {
                    registerErrors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body,
                    role: role,
                    country: country
                })
                })
            } else { 
                db.User.create ({
                    full_name: req.body.fullname,
                    user_name: req.body.username,
                    email: req.body.email,
                    avatar: req.file.filename,
                    password: bcryptjs.hashSync(req.body.contrasena, 10),
                    birthday: req.body.birthday,
                    role_id: req.body.role,
                    country_id: req.body.country
                })
                res.redirect("login");
            }

        })
       
    } 
 },

    // Mostrar formulario de login

    login: (req, res) => {
        // console.log(req.session);
        res.render('login');

    },
  
    // Procesar login

    processLogin: (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(usuario => {
            if (usuario) {
                let validPassword = bcryptjs.compareSync(req.body.contrasena, usuario.password);

                if (validPassword) {
                    delete usuario.password;
                    req.session.userLogged = usuario;
                    if (req.body.recordarUsuario) {
                        res.cookie('usernameCookie', req.body.email, { maxAge: 86400000 }); // cookie que dura 24 horas
                    }
                    res.redirect('profile')

            } else {
                res.render('login', {
                    loginErrors: {
                        email: {
                            msg: 'Revisa tus credenciales'
                        }
                    }
                })
            }

        } else {
            res.render('login', {
                loginErrors: {
                    email: {
                        msg: 'Email incorrecto'
                    }
                }
            })
        }})
// prueba test
       
    },

    editUser: (req, res) => {
        let userToEdit = req.session;
        let user = db.User.findByPk(req.params.id)

        let role = db.Role.findAll();
        let country = db.Country.findAll();

          Promise.all([role, country,user])
            .then(([role, country,user])=>{
             
              res.render('userEdit',{
                    oldData: userToEdit,
                    role: role,
                    country: country,
                    user:user
                })
            })
    },

    processEdition: (req, res) => {
        let idUser = req.params.id;
      // const registerValidation = validationResult(req);
   
       db.User.update({
        full_name: req.body.fullname,
        user_name: req.body.username,
        email: req.body.email,
        avatar: req.file.filename,
        password: bcryptjs.hashSync(req.body.contrasena, 10),
        birthday: req.body.birthday,
        role_id: req.body.role,
        country_id: req.body.country
    }, {
        where: {
            id: idUser,
        }
    })
    //delete user.password; 
        .then(()=>{
             res.redirect('/')
        })
   
    
    // req.session.userLogged = user;
    
   
    

},
          

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('usernameCookie')
        res.redirect('/')
    }, 


    deleteUser: (req, res) => {
        let userToDelete = req.session.userLogged;
        db.User.destroy({
            where : {
                id: userToDelete.id
            }
        })
        req.session.destroy();
        res.redirect('/');
    }

}



module.exports = usersController;