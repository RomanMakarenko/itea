const models = require('../models');
const jwt = require('jsonwebtoken');
const secretKey = "secret";

const loginUser = (req, res) => {
    const user = JSON.parse(req.body);
    console.log(user.email)
    console.log(user.password)
    models.User.findOne({email: user.email}, (err, data) => {
        if(err) console.log(err);
        if((user !== null) && (user.password == data.password)) {
            const token = jwt.sign({ email: data.email }, secretKey, {expiresIn: '1h'});
            res.status(200).json({token: token}).end();
        } else {
            res.status(401).send({message: "You are not authorized!"}).end();
        }
    });
};

// const verifyUser = (req, res, next) => {
//     if(req.headers.authorization) {
//         const tokenBearer = req.headers.authorization;
//         const token = tokenBearer.split(' ')[1];
//         if(!token) {
//             res.status(401).send("You are not authorized!").end();
//         }
//         jwt.verify(token, secretKey, (err, data) => {
//             if(err) console.log(err);
//             next();
//         });
//     } else {
//         res.status(401).send("You are not authorized!").end();
//     }
// };

module.exports = {
    loginUser,
   // verifyUser
};