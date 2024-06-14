const socket = io('http://localhost:3001') // Ensure this URL matches your server's URL and port
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)
console.log(`New user: ${name}`)

socket.on('chat-message', (data) => {
  appendMessage(`${data.name}: ${data.message}`)
  console.log(`Message received: ${data.name}: ${data.message}`)
})

socket.on('user-connected', (name) => {
  appendMessage(`${name} connected`)
  console.log(`User connected: ${name}`)
})

socket.on('user-disconnected', (name) => {
  appendMessage(`${name} disconnected`)
  console.log(`User disconnected: ${name}`)
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  console.log(`Message sent: ${message}`)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
