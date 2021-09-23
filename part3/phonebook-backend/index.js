const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      "id": 1,
      "name": "Jymmy hendrick",
      "number": "998877445566"
    },
    {
      "id": 2,
      "name": "Emanuel Pontoni",
      "number": "3537599073"
    },
    {
      "id": 3,
      "name": "San Agustín",
      "number": "0810-san-agustin"
    },
    {
      "id": 4,
      "name": "Pepe Argento",
      "number": "80800 555 900"
    },
    {
      "id": 6,
      "name": "contact 3",
      "number": "333 333 333"
    },
    {
      "id": 8,
      "name": "Fulano",
      "number": "8888777799++"
    },
    {
      "id": 7,
      "name": "test",
      "number": "33333"
    },
    {
      "id": 9,
      "name": "asd",
      "number": "asd"
    },
    {
      "id": 10,
      "name": "asddasdasd",
      "number": "ddddd"
    }
  ]

app.get('/', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log('body', body)
    console.log('body.number', body.number)
  
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }

    console.log('check name', persons.filter(p => p.name === body.name))

    if (persons.filter(p => p.name === body.name).length !== 0){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
  
    const person = {
      id: generateId(),
      name: body.name || body.number,
      number: body.number,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})