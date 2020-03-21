const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        default : 'default@user.mail',
    },
    password: {
        type: String,
        required: true,
        default : 'superpass',
    },
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
