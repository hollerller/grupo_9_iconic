const fs = require('fs');
const path = require('path');
const User = require('../data/models/User');
const bcryptjs = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

//Validation result - Express Validator
const { validationResult } = require('express-validator')

// Multer
const usersArray = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

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
                        msg: 'Este email ya está registrado'}
                    },
                    oldData: req.body
                })
            } else {

            let newUser = {
                id: User.generateId(),
                fullName: req.body.nombreYApellido,
                username: req.body.username,
                email: req.body.email,
                avatar: req.file.filename,
                password: bcryptjs.hashSync(req.body.contrasena, 10),
                birthday: req.body.fechaNacimiento,
                terms: req.body.tyc,
                category: 'vendedor'
               }
               usersArray.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(usersArray, null, ' ')); 
            res.redirect("/login");   
            };
        }
        },

    // Mostrar perfil de usuario
    userID: (req, res) => {
        let idUsuario = req.params.id;
        res.render('userDetail', 
        {usuario: usersArray[idUsuario]});
    },

    // Mostrar formulario de login

    login: (req, res) => {
        res.render('login');
    },
    // Procesar login

    processLogin: (req, res) => {
       const loginValidations =  validationResult(req);
       if (loginValidations.errors.length > 0) {
        res.render('login', {
            loginErrors: loginValidations.mapped(),
            oldData: req.body
        })
       }
    }

}

module.exports = usersController;