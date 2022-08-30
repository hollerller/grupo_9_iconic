const fs = require('fs');
const path = require('path');
const User = require('../data/models/User');
const bcryptjs = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

//Validation result - Express Validator
const { validationResult } = require('express-validator');
//const { findByField, findByPk } = require('../data/models/User');

// Multer
let usersArray = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    // user: (req, res) => {
    //     res.render('userList', {userList: usersArray});
    // },

    // Mostrar Formulario de registro

    register: (req, res) => {
        res.render('register')
    },

    //Procesar formulario de registro

    createUser: (req, res) => {
        const registerValidation = validationResult(req);
        //console.log(registerValidation.mapped());
        if (registerValidation.errors.length > 0) {
            res.render('register', {
                registerErrors: registerValidation.mapped(),
                oldData: req.body
            })
        } else {
            let userExists = User.findByField('email', req.body.email);

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

                let newUser = {
                    id: User.generateId(),
                    fullName: req.body.nombreYApellido,
                    username: req.body.usuario,
                    email: req.body.email,
                    avatar: req.file.filename,
                    password: bcryptjs.hashSync(req.body.contrasena, 10),
                    birthday: req.body.fechaNacimiento,
                    terms: req.body.tyc,
                    category: 'vendedor'
                }
                usersArray.push(newUser);
                fs.writeFileSync(usersFilePath, JSON.stringify(usersArray, null, ' '));
                res.redirect("login");
            };
        }
    },

    // Mostrar perfil de usuario
    userID: (req, res) => {
        //console.log(req.session.userLogged);
        res.render('userDetail',
            { usuario: req.session.userLogged });
    },

    // Mostrar formulario de login

    login: (req, res) => {
        // console.log(req.session);
        res.render('login');

    },
    // Procesar login

    processLogin: (req, res) => {
        let userToLogin = User.findByField('username', req.body.usuario);

        if (userToLogin) {
            let validPassword = bcryptjs.compareSync(req.body.contrasena, userToLogin.password);
            if (validPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.recordarUsuario) {
                    res.cookie('usernameCookie', req.body.usuario, { maxAge: 86400000 }); // cookie que dura 24 horas
                }
                //console.log(req.session.userLogged);
                // let userLogged = User.findByPk(userToLogin.id)
                //  res.render('userDetail', 
                // {usuario: userLogged});
                res.redirect('profile')

            } else {
                res.render('login', {
                    loginErrors: {
                        usuario: {
                            msg: 'Revisa tus credenciales'
                        }
                    }
                })
            }

        } else {
            res.render('login', {
                loginErrors: {
                    usuario: {
                        msg: 'Email incorrecto'
                    }
                }
            })
        }
    },
    editUser: (req, res) => {

        res.render('userEdit', {
            oldData: req.session.userLogged
        })
    },

    processEdition: (req, res) => {
        const registerValidation = validationResult(req);
        //console.log(registerValidation.mapped());
        if (registerValidation.errors.length > 0) {
            res.render('register', {
                registerErrors: registerValidation.mapped(),
                oldData: req.session.userLogged,

            })
        } else {
            let userToEdit = req.session.userLogged;
            let edditedUsers = usersArray.map(item => {
                if (item.id == userToEdit.id){
                item.id = userToEdit.id;
                item.fullName = req.body.fullname;
                item.username = req.body.username;
                item.email = req.body.email;
                item.avatar = req.file.filename;
                item.birthday = req.body.birthday;
                item.terms = 'aceptoTerminos';
                item.category = 'vendedor';
                }
                return item;
            })
            fs.writeFileSync(usersFilePath,JSON.stringify(edditedUsers, null, ' '));   
            console.log(req.session.userLogged);
            let user = edditedUsers.find(element => element.id == userToEdit.id);
            delete user.password;
            req.session.userLogged = user;
           
            console.log(req.session.userLogged)
           
            res.render('userDetail',{ usuario: user })
       //     if (userToEdit.id != undefined) {
                
         //   }    
              
    }
        
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('usernameCookie')
        res.redirect('/')
    }, 


    deleteUser: (req, res) => {
        let userToDelete = req.session.userLogged;
        let newUserData = usersArray.filter(element => element.id != userToDelete.id)
        usersArray = newUserData;
        fs.writeFileSync(usersFilePath, JSON.stringify(usersArray, null, ' '));
        req.session.destroy();
        res.redirect('/');
    }

}

module.exports = usersController;