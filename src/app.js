const express = require('express')
const cors = require('cors')
const consign = require('consign')
const config = require('./config/config')

const app = express()

app.use(express.json())
app.use(cors({ credentials: true, origin: config.app.base_url_frontend }))
app.use(express.static('public'))

consign().include('src/routes').into(app)

app.listen(3333, () => {
  console.log('Server Iniciado...')
})
