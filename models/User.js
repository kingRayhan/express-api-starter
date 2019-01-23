const beautifyUnique = require('mongoose-beautiful-unique-validation')

const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: [6, 'Password should be atleast 6 character'],
        required: [true, 'Name is required'],
    },
    username: {
        type: String,
        trim: true,
        minlength: [6, 'Password should be atleast 6 character'],
        unique: `{VALUE} is already taken`,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        unique: `{VALUE} is already taken`,
        trim: true,
        required: [true, 'Email is required'],
        validate: {
            validator(email) {
                return isEmail(email)
            },
            message: ({ value: email }) =>
                `${email} is not a valid email address`,
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
})
userSchema.plugin(beautifyUnique)

module.exports = model('User', userSchema)
