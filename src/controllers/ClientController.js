const mongoose = require('mongoose')
const Client = require('../models/Client')

class ClientController {
  async register(req, res) {
    const { name, description } = req.body
    const isExistClient = await Client.findOne({ name })

    if (!name) {
      res.status(422).json({ message: 'O campo nome é obrigatorio' })
      return
    }

    if (!!isExistClient) {
      res.status(422).json({ message: 'Já existe um Cliente com esse nome' })
      return
    }

    try {
      const client = await Client.create({
        name: name,
        description: description,
      })
      res.status(200).json({ message: 'Cliente Criado com sucesso', client })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  async getAll(req, res) {
    try {
      const clients = await Client.find()
      res.status(200).json({ clients })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  async getById(req, res) {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido' })
      return
    }

    try {
      const client = await Client.findById(id)
      if (!client) {
        res.status(422).json({ message: 'Nenhum cliente encontrado' })
      }
      res.status(200).json({ client })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  async editById(req, res) {
    const id = req.params.id
    const { name, description } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido' })
      return
    }

    if (!name) {
      res.status(422).json({ message: 'O campo nome é obrigatorio' })
      return
    }

    try {
      const client = await Client.findById(id)

      if (!client) {
        res.status(422).json({ message: 'Nenhum cliente encontrado' })
        return
      }

      const updatedClient = await Client.findByIdAndUpdate(
        { _id: client._id },
        { $set: { name, description } },
        { new: true },
      )
      res
        .status(200)
        .json({ message: 'Cliente atualizado com sucesso', updatedClient })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  async deleteById(req, res) {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido' })
      return
    }

    try {
      const client = await Client.findById(id)

      if (!client) {
        res.status(400).json({ message: 'Cliente não encontrado' })
        return
      }
      await client.deleteOne(client)
      const clients = await Client.find()
      res.status(200).json({ message: 'Cliente deletado com sucesso', clients })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  async search(req, res) {
    const key = req.params.key

    let query = {}

    if (mongoose.Types.ObjectId.isValid(key)) {
      query = { _id: key }
    } else {
      query = { name: { $regex: key, $options: 'i' } }
    }

    try {
      const clients = await Client.find(query)

      if (clients.length === 0) {
        res.status(404).json({ message: 'Nenhum cliente encontrado' })
        return
      }

      res.status(200).json({ clients })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}

module.exports = new ClientController()
