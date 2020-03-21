const models = require('../models');

const createUser = (req, res) => {
    const newUser = JSON.parse(req.body);
    models.User.create(newUser, (err, data) => {
        if(err) console.log(err);
        res.status(201).send(`User with id: '${data}' was created`).end();
    });
};

module.exports = {
    createUser,
}
