const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 8 },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

userSchema.pre('save', function (next) {
    const hashPassword = bcrypt.hashSync(this.password, 8);
    this.password = hashPassword;
    next();
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model('user', userSchema);
module.exports = User;