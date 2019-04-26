const http = require('http')
const port = 3000
const server = http.createServer()

let messages = [
  { 'id': 1, 'user': 'christie lynam', 'message': 'react and redux are cool!' },
  { 'id': 2, 'user': 'david whitaker', 'message': 'servers are cool!' },
  { 'id': 3, 'user': 'jeff casimir', 'message': 'jobs are cool!' }
]

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response)
  } else if (request.method === 'POST') {
    let newMessage;
    request.on('data', (data) => {
      newMessage = {
        id: Date.now(),
        ...JSON.parse(data)
      }
    })
    request.on('end', () => {
      addMessage(newMessage, response)
    })
  }
})

const getAllMessages = (response) => {
  response.setHeader('Content-Type', 'application/json')
  response.statusCode = 200
  response.write(JSON.stringify(messages))
  response.end()
}

const addMessage = (newMessage, response) => {
  messages = [...messages, newMessage]
  response.setHeader('Content-Type', 'application/json')
  response.statusCode = 201
  response.write(JSON.stringify(messages))
  response.end()
}

server.listen(port, () => {
  console.log(`The HTTP server is running on port ${port}`)
})