const mongoose = require('../../db/connection')
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: String, select: false },
    isVerify: {
      type: Boolean,
      required: true,
    },
    emailToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const User = mongoose.model('User', UserSchema)

module.exports = User
