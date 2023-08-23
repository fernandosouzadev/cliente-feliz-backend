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
    host_mail: process.env.HOST_MAIL,
    port_mail: process.env.PORT_MAIL,
    secure_mail: SECURE_MAIL,
    user_mail: process.env.USER_MAIL,
    pass_mail: process.env.PASS_EMAIL,
  },
}

module.exports = config
