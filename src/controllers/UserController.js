const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const jwt = require('jsonwebtoken')
const getUserByToken = require('../helpers/get-user-by-token')
const mailSend = require('../helpers/mail-send')
const crypto = require('crypto')
const mongoose = require('mongoose')
const validateEmail = require('../helpers/validate-email')

class UserController {
  async register(req, res) {
    const { name, email, password, confirmPassword } = req.body

    if (!name) {
      res.status(422).json({ message: 'O campo nome é obrigatorio' })
      return
    }

    if (!email) {
      res.status(422).json({ message: 'O campo e-mail é obrigatorio' })
      return
    }
    if (!validateEmail(email)) {
      res.status(422).json({ message: 'E-mail invalido' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'O campo senha é obrigatorio' })
      return
    }

    if (!confirmPassword) {
      res
        .status(422)
        .json({ message: 'O campo de confirmação da senha é obrigatorio' })
      return
    }

    if (password !== confirmPassword) {
      res.status(422).json({ message: 'As senhas não conferem ' })
      return
    }

    const userExists = await User.findOne({ email: email })
    if (userExists) {
      res.status(422).json({ message: 'E-mail já cadastrado' })
      return
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    const token = crypto.randomBytes(20).toString('hex')

    const user = new User({
      name,
      email,
      password: hashPassword,
      isVerify: false,
      emailToken: token,
    })

    try {
      const newUser = await user.save()
      mailSend.verifyEmail(user)
      res.status(201).json({
        message:
          'Usuario registrado, foi enviado para seu e-mail um link para confirmação',
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  async login(req, res) {
    const { email, password } = req.body

    if (!email) {
      res.status(422).json({ message: 'O campo e-mail é obrigatorio' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'O campo senha é obrigatorio' })
      return
    }

    const user = await User.findOne({ email: email }).select('-emailToken')

    if (!user) {
      res.status(422).json({ message: 'Esse Usuario não existe' })
      return
    }

    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
      res.status(422).json({ message: 'Credenciais invalidas' })
      return
    }

    if (!user.isVerify) {
      res.status(422).json({
        message: 'Para acessar o sistema, é necessario validar seu e-mail!',
      })
      return
    }

    try {
      user.password = undefined
      await createUserToken(user, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      let decoded
      const token = getToken(req)
      decoded = jwt.verify(token, 'secret')
      currentUser = await User.findById(decoded.id).select([
        '-password',
        '-emailToken',
      ])
    } else {
      currentUser = null
    }

    try {
      res.status(200).json(currentUser)
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  async getUserById(req, res) {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido' })
      return
    }

    try {
      const user = await User.findById(id).select('-password')
      if (!user) {
        res.status(400).json({ message: 'Usuario não encontrado' })
        return
      }

      res.status(200).json({ user })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  async editUserById(req, res) {
    const { name, email, password, confirmPassword } = req.body
    const token = getToken(req)
    const user = await getUserByToken(token)
    const emailExists = await User.findOne({ email })

    if (!name) {
      res.status(422).json({ message: 'O campo nome é obrigatorio' })
      return
    }

    if (!user) {
      res.status(400).json({ message: 'Usuario não encontrado' })
      return
    }

    if (emailExists) {
      res.status(400).json({ message: 'Email digitado já esta em uso' })
      return
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        message: 'O campo senha e confirmação de senha devem ser iguais',
      })
      return
    } else if (password === confirmPassword && password !== undefined) {
      const salt = await bcrypt.genSalt(12)
      const hashPassword = await bcrypt.hash(password, salt)
      user.password = hashPassword
    }

    user.name = name
    user.email = email

    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      )
      res
        .status(200)
        .json({ message: 'Usuario atualizado com sucesso', updatedUser })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  async deleteUser(req, res) {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido' })
      return
    }

    try {
      const user = await User.findById(id)
      if (!user) {
        res.status(400).json({ message: 'Usuario não encontrado' })
        return
      }

      await User.deleteOne(user)
      res.status(200).json({ message: 'usuario Deletado com sucesso' })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  async validationEmail(req, res) {
    const { emailToken } = req.body
    const user = await User.findOne({ emailToken })

    if (!user) {
      res.status(422).json({ message: 'Não foi encontrado o usuario' })
      return
    }

    if (user.emailToken === emailToken) {
      user.isVerify = true
      user.emailToken = null
    }

    try {
      await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      )
      res.status(200).json({ message: 'Email verificado com sucesso' })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      res.status(422).json({ message: 'Não foi encontrado o usuario' })
      return
    }

    const token = crypto.randomBytes(20).toString('hex')
    const now = new Date()
    now.setHours(now.getHours() + 2)

    user.passwordResetToken = token
    user.passwordResetExpires = now

    try {
      await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      )
      mailSend.forgotPassword(user)
      res.status(200).json({
        message:
          'Foi enviado para o e-mail do usuario um link para recuperar a senha',
      })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  async resetPassword(req, res) {
    const { email, token, password, confirmPassword } = req.body

    if (!email) {
      res.status(422).json({ message: 'O campo e-mail é obrigatorio' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'O campo senha é obrigatorio' })
      return
    }

    if (!confirmPassword) {
      res
        .status(422)
        .json({ message: 'O campo de confirmação da senha é obrigatorio' })
      return
    }

    if (password !== confirmPassword) {
      res.status(422).json({ message: 'As senhas não conferem ' })
      return
    }

    try {
      const user = await User.findOne({ email }).select([
        '+passwordResetToken',
        '+passwordResetExpires',
      ])

      if (!user) {
        res.status(422).json({ message: 'Não foi encontrado o usuario' })
        return
      }

      if (user.passwordResetToken !== token) {
        res.status(422).json({ message: 'Token invalido' })
        return
      }

      const now = new Date()

      if (now > user.passwordResetExpires) {
        res
          .status(422)
          .json({ message: 'Token expirado, solicite outro token' })
        return
      }
      const salt = await bcrypt.genSalt(12)
      const hashPassword = await bcrypt.hash(password, salt)
      user.password = hashPassword

      await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      )

      res.status(200).json({ message: 'Senha atualizada com sucesso!' })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }
}

module.exports = new UserController()
