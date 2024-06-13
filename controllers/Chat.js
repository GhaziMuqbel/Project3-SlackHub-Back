const Chat = require('../models/Chat')
const User = require('../models/User')

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

const message = async (req, res) => {
  try {
    const { message, userId } = req.body.res
    const chat = await Chat.findById(req.params.id)

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' })
    }

    chat.messages.push({
      message,
      user: userId,
      created: new Date().toISOString()
    })
    await chat.save()

    res.status(200).json(chat)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate('users').populate('messages.user')
    res.status(200).json(chats)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const deleteChatById = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id)
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' })
    }
    res.status(200).json({ message: 'Chat deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
module.exports = {
  createChat,
  message,
  getAllChats,
  deleteChatById
}
