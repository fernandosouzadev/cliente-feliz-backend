const mongoose = require('../../db/connection')
const { Schema } = mongoose

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
)

const Client = mongoose.model('Client', ClientSchema)

module.exports = Client
