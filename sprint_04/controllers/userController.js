const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const usersArray = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {
   // user: (req, res) => {
   //     res.render('userList', {userList: usersArray});
   // },
    userID: (req, res) => {
        let idUsuario = req.params.id;
        res.render('userDetail', 
        {usuario: usersArray[idUsuario]});
    }
}

module.exports = usersController;