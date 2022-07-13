const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const usersArray = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {
    userID: (request, response) => {
        response.send('User ID ' + request.params.id);
    },
}

module.exports = usersController;