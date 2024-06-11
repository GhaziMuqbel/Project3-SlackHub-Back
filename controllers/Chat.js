const Chat = require('../models/chat')
const User = require('../models/user')

const createChat = async (req, res) => {
  try {
    const { users } = req.body
    const chat = new Chat({ users })
    await chat.save()
    res.status(201).json(chat)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createChat
}
