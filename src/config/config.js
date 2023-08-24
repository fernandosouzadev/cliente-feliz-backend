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

if (!process.env.HOST_MAIL) {
  throw new Error('A variável de ambiente HOST_MAIL não está definida.')
}

if (!process.env.PORT_MAIL) {
  throw new Error('A variável de ambiente PORT_MAIL não está definida.')
}

if (!process.env.SECURE_MAIL) {
  throw new Error('A variável de ambiente SECURE_MAIL não está definida.')
}

if (!process.env.USER_MAIL) {
  throw new Error('A variável de ambiente USER_MAIL não está definida.')
}

if (!process.env.PASS_EMAIL) {
  throw new Error('A variável de ambiente PASS_EMAIL não está definida.')
}

const config = {
  app: {
    base_url_frontend: process.env.BASE_URL_FRONTEND,
    jwtsecret: process.env.JWTSECRET,
    database_url: process.env.DATABASE_URL,
    host_mail: process.env.HOST_MAIL,
    port_mail: process.env.PORT_MAIL,
    secure_mail: process.env.SECURE_MAIL === 'true',
    user_mail: process.env.USER_MAIL,
    pass_mail: process.env.PASS_EMAIL,
  },
}

module.exports = config
