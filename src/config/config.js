require('dotenv/config')

if (!process.env.BASE_URL_FRONTEND) {
  throw new Error('A variável de ambiente BASE_URL_FRONTEND não está definida.')
}

if (!process.env.JWTSECRET) {
  throw new Error('A variável de ambiente JWTSECRET não está definida.')
}

if (!process.env.DATABASE_URL) {
  throw new Error('A variável de ambiente DATABASE_URL não está definida.')
}

const config = {
  app: {
    base_url_frontend: process.env.BASE_URL_FRONTEND,
    jwtsecret: process.env.JWTSECRET,
    database_url: process.env.DATABASE_URL,
  },
}

module.exports = config
