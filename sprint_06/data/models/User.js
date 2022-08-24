// Guardar al usuario en la DB
// Buscar un usuario
// Buscar un usuario por un ID
// Editar la informacion de un usuario
// Eliminar a un usuario de la DB

const fs = require('fs');
const path = require('path');

const User = {
    fileName: './data/users.json',

    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
        return lastUser.id + 1;
    } else {
        return 1;
    }
    }
}

module.exports = User;