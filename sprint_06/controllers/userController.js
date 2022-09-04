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
        db.User.findByPk(req.session.id,{
            include:[
                {association: "roles"},
                {association: "countries"}
            ]   
        }).then(user =>{
                res.render('userDetail', {user:user})
            })
    },
    // Mostrar Formulario de registro

    register: (req, res) => {
        let role = db.Role.findAll();
        let country = db.Country.findAll();
   /*     let usuario1 = db.User.findByPk(1).then((result) => {
            console.log(usuario1);
        })*/
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
        console.log(req.body);
        db.User.create ({
            full_name: req.body.nombreYApellido,
            user_name: req.body.usuario,
            email: req.body.email,
            avatar: req.file.filename,
            password: bcryptjs.hashSync(req.body.contrasena, 10),
            birthday: req.body.fechaNacimiento,
            role_id: req.body.role,
            country_id: req.body.country
        })
    res.redirect("login"); 
        /*const registerValidation = validationResult(req);
        console.log(req.body);
        if (registerValidation.errors.length > 0) {
            res.render('register', {
                registerErrors: registerValidation.mapped(),
                oldData: req.body
            })
        } else {
            let userExists = db.User.findOne({
                where: {
                    email: req.body.email
                }
            })          
            if (userExists) {
                res.render('register', {
                    registerErrors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                })
            } else {
                db.User.create ({
                    full_name: req.body.nombreYApellido,
                    user_name: req.body.usuario,
                    email: req.body.email,
                    avatar: req.file.filename,
                    password: bcryptjs.hashSync(req.body.contrasena, 10),
                    birthday: req.body.fechaNacimiento,
                    role_id: req.body.role,
                    country_id: req.body.country
                })
                }
            res.redirect("login");
      
        }
        */
    },



    // Mostrar formulario de login

    login: (req, res) => {
        // console.log(req.session);
        res.render('login');

    },
    // Procesar login

    processLogin: (req, res) => {
        let userToLogin = db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then
// prueba test
        if (userToLogin) {
            let validPassword = bcryptjs.compareSync(req.body.contrasena, userToLogin.password);
            if (validPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

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
        }
    },
    editUser: (req, res) => {
            //pedidos asincrónicos//
            let user = db.User.findByPk(req.session.id)
            let roles = db.Role.findAll();
            let countries = db.Country.findAll();
            
          Promise.all([user, roles, countries])
            .then(([user, role, country])=>{
                res.render('userEdit',{
                    user: user,
                    roles: roles,
                    countries: countries
                })
            })
    },

    processEdition: (req, res) => {
        const registerValidation = validationResult(req);
        
        if (registerValidation.errors.length > 0) {
            res.render('register', {
                registerErrors: registerValidation.mapped(),
                oldData: req.session.userLogged,

            })

        } else {

            let userToEdit = req.session.userLogged;

            db.User.update({
                full_name: req.body.nombreYApellido,
                user_name: req.body.usuario,
                email: req.body.email,
                avatar: req.file.filename,
                password: bcryptjs.hashSync(req.body.contrasena, 10),
                birthday: req.body.fechaNacimiento,
                role_id: req.body.role,
                country_id: req.body.country
            }, {
            where: {
                id: req.session.id
            }
        })
            let user = db.User.findOne({
                where: {
                    email: req.session.email
                }
            });
            delete user.password;
            req.session.userLogged = user;
            res.render('userDetail',{ usuario: user })
    }
        
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