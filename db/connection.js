const mongoose = require('mongoose')
const config = require('../src/config/config')

async function main() {
  await mongoose.connect(config.app.database_url)
  console.log('Mongoose connect sucessful!')
}

main().catch((error) => console.log(error))

module.exports = mongoose
