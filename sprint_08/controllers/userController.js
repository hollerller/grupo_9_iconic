const fs = require('fs');
const path = require('path');
const User = require('../database/models/User');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');

//Validation result - Express Validator
const { validationResult } = require('express-validator');

const usersController = {

    // Mostrar perfil de usuario
    userID: (req, res) => {
        let userToDisplay = req.session.userLogged;
        //console.log(userToDisplay)
        db.User.findByPk(userToDisplay.id, {
            include: [
                { association: "roles" },
                { association: "countries" }
            ]
        }).then(user => {
            res.render('userDetail', { usuario: user })
        })
    },
    // Mostrar Formulario de registro

    register: (req, res) => {
        let role = db.Role.findAll();
        let country = db.Country.findAll();

        Promise.all([role, country])
            .then(function ([role, country]) {
                res.render('register', {
                    role: role,
                    country: country
                })
            })
    },

    //Procesar formulario de registro

    createUser: (req, res) => {
        const registerValidation = validationResult(req)
        //console.log(registerValidation);

        if (registerValidation.errors.length > 0) {

            let role = db.Role.findAll();
            let country = db.Country.findAll();

            Promise.all([role, country])
                .then(function ([role, country]) {
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
                        .then(function ([role, country]) {

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
                    db.User.create({
                        full_name: req.body.nombreYApellido,
                        user_name: req.body.usuario,
                        email: req.body.email,
                        avatar: req.file.filename,
                        password: bcryptjs.hashSync(req.body.contrasena, 10),
                        birthday: req.body.fechaNacimiento,
                        hidden: false,
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
        const loginValidations = validationResult(req)
        //console.log(loginValidations);

        if (loginValidations.errors.length > 0) {
            res.render('login', {
                loginErrors: loginValidations.mapped(),
                oldData: req.body
            })
        } else {
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(usuario => {
                if (usuario && usuario.hidden == false) {
                    let validPassword = bcryptjs.compareSync(req.body.contrasena, usuario.password);
                    if (validPassword) {
                        delete usuario.password;
                        req.session.userLogged = usuario;
                        if (req.body.recordarUsuario) {
                            res.cookie('usernameCookie', req.body.email, { maxAge: 86400000 }); // cookie que dura 24 horas
                        }
                        res.redirect('profile')
                    }
                }
            })
        }
    },

    editUser: (req, res) => {
        let userToEdit = req.session;
        //console.log(userToEdit);
        let user = db.User.findByPk(req.params.id)

        let role = db.Role.findAll();
        let country = db.Country.findAll();

        Promise.all([role, country, user])
            .then(([role, country, user]) => {

                res.render('userEdit', {
                    oldData: userToEdit,
                    role: role,
                    country: country,
                    user: user
                })
            })
    },

    processEdition: (req, res) => {
        let idUser = req.params.id;
        const editValidation = validationResult(req);
      //  console.log(editValidation);
        let userToEdit = req.session;
        let user = db.User.findByPk(req.params.id);


        if (editValidation.errors.length > 0) {

            let role = db.Role.findAll();
            let country = db.Country.findAll();

            Promise.all([role, country, user])
                .then(([role, country, user]) => {
                    res.render('userEdit', {
                        registerErrors: editValidation.mapped(),
                        oldData: userToEdit,
                        role: role,
                        country: country,
                        user: user
                    })
                })

        } else {
            db.User.update({
                full_name: req.body.fullname,
                user_name: req.body.username,
                email: req.body.email,
                avatar: req.file.filename,
                //password: contrasena,
                birthday: req.body.birthday,
                role_id: req.body.role,
                country_id: req.body.country
            }, {
                where: {
                    id: idUser,
                }
            })
                //delete user.password; 
                .then(() => {
                    res.redirect('/')
                })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('usernameCookie')
        res.redirect('/')
    },


    deleteUser: (req, res) => {
        let userToDelete = req.session.userLogged;
        db.User.update({
            hidden: true
        }, {
            where: {
                id: userToDelete.id
            }
        })
        req.session.destroy();
        res.redirect('/');
    },


    userList: (req, res) => {
        db.User.findAll().then( usuarios => {
           //
           let arrayUsuarios = [];
           
           for (i = 0;i< usuarios.length;i++){
            arrayUsuarios.push(
                {id: usuarios[i].dataValues.id,
                name:  usuarios[i].dataValues.full_name,
                email:  usuarios[i].dataValues.email,
                detail: 'http://localhost:3000/users/api/users/' + usuarios[i].dataValues.id
            })
           }

           //console.log(arrayUsuarios);
            return res.status(200).json({ 
               total: usuarios.length,
               data: arrayUsuarios
               });
        }
        )

    },

    userDetail: (req, res) => {
        db.User.findByPk( req.params.id ).then( usuario => {
            return res.status(201).json(
                {id: usuario.id,
                name: usuario.full_name,
                username: usuario.user_name,
                avatar: 'http://localhost:3000/images/users/' + usuario.avatar,
                birthday: usuario.birthday,
                country_id: usuario.country_id
                }
                );
        }
        )

    }

}

module.exports = usersController;