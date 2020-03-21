const models = require('../models');
const jwt = require('jsonwebtoken');
const secretKey = "secret";

const loginUser = (req, res) => {
    models.UserLogin.findOne({name: req.body.name}, (err, data) => {
        if(err) console.log(err);
        if(req.body.password == data.password) {
            const token = jwt.sign({ name: data.name }, secretKey, {expiresIn: '1h'});
            res.status(200).json({token: token}).end();
        } else {
            res.status(401).send({message: "You are not authorized!"}).end();
        }
    });
};
const verifyUser = (req, res, next) => {
    if(req.headers.authorization) {
        const tokenBearer = req.headers.authorization;
        const token = tokenBearer.split(' ')[1];
        if(!token) {
            res.status(401).send("You are not authorized!").end();
        }
        jwt.verify(token, secretKey, (err, data) => {
            if(err) console.log(err);
            next();
        });
    } else {
        res.status(401).send("You are not authorized!").end();
    }
};

module.exports = {
    loginUser,
    verifyUser
};