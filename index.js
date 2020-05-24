const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res, param) => {

   if (req.method === 'POST') {

       return JSON.stringify(req.body);
   }

    return '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));

const unknownEndpoint = (request, response) => {

    response.status(404).send({ error: 'unknown endpoint' });
}

let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        phone: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        phone: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        phone: "39-23-6423122",
        id: 4
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Main Mauri\'s Phone book server page.</h1>');
});

app.get('/api/persons', (request, response) => {

    response.json(persons);
});

app.get('/info', (request, response) => {

   response.send('<p> The Phone book has info for ' + persons.length + 'people </p>'
       + '<br/>'
       + Date());
});

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id);
    const person = persons.find(note => note.id === id);

    if (person) {

        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

app.post('/api/persons/', (request, response) => {

    const body = request.body;

    if (!body.name && !body.phone) {

        return response.status(400).json({
            error: 'content missing'
        });
    }

    if (persons.find(person => person.name === body.name)) {

        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = {
        name: body.name,
        phone: body.phone,
        id: createRandomId()
    }

    persons = persons.concat(person);

    response.json(person);
});

const createRandomId = () => Math.floor(Math.random() * 10000);

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
