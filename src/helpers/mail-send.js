const nodemailer = require('nodemailer')
const config = require('../config/config')

class EmailSend {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: config.app.host_mail,
      port: config.app.port_mail,
      secure: config.app.secure_mail,
      auth: {
        user: config.app.user_mail,
        pass: config.app.pass_mail,
      },
    })
  }

  verifyEmail = (user) => {
    this.transport
      .sendMail({
        from: `Cliente Feliz <${config.app.user_mail}>`,
        to: user.email,
        subject: 'Verificação de e-mail',
        html: `<h2>Olá ${user.name}, bem vindo ao Cliente Feliz!</h2><br/><p>Clique no link abaixo para validar seu e-mail</p><br/><a href="${config.app.base_url_frontend}/validar-email/${user.emailToken}">CONFIRMAR E-MAIL</a>`,
        text: `Olá ${user.name}, bem vindo ao Cliente Feliz! Clique no link abaixo para validar seu e-mail ${config.app.base_url_frontend}/validar-email/${user.emailToken}`,
      })
      .then(() => console.log('Email Enviado!'))
      .catch((error) => console.log(error))
  }

  forgotPassword = (user) => {
    this.transport
      .sendMail({
        from: 'Cliente Feliz <naoresponda-clientefeliz@hotmail.com>',
        to: user.email,
        subject: 'Recuperação de senha',
        html: `<h2>Olá ${user.name}!</h2><br/><p>Clique no link abaixo para alterar sua senha</p><br/><a href="${config.app.base_url_frontend}/resetar-senha/${user.passwordResetToken}">RESETAR SENHA</a>`,
        text: `Olá ${user.name}! Clique no link abaixo para alterar sua senha ${config.app.base_url_frontend}/resetar-senha/${user.passwordResetToken}`,
      })
      .then(() => console.log('Email Enviado!'))
      .catch((error) => console.log(error))
  }
}

module.exports = new EmailSend()
