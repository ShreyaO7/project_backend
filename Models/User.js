const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    age: {
        type: Number,
        required: true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
}, { timestamps: true });

// Pre-save hook to hash password
// UserSchema.pre('save', function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     const salt = bcrypt.genSaltSync(10);
//     this.password = bcrypt.hashSync(this.password, salt);
//     next();
// });

const User = mongoose.model("User", UserSchema);

module.exports = User;
