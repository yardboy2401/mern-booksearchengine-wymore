//requires for mongoose, bcrypt for password hash and Book model schema
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const bookSchema = require('./Book');

//defining User Schema
const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedBooks: [bookSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//pre save for User password to salt and hash 
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

//bcrypt check of password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//virtual book count based on savedBooks length
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

//User model and schema declaration
const User = model('User', userSchema);

//export User model
module.exports = User;
