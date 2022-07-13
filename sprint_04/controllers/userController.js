const usersController = {
    userID: (request, response) => {
        response.send('User ID ' + request.params.id);
    },
}

module.exports = usersController;