require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// TOKEN for displaying the request in json format.

morgan.token('body', (req, res, param) => {

   if (req.method === 'POST') {

       return JSON.stringify(req.body);
   }

    return '';
});

// LOGGER

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));

// FOR EACH REQUESTS THAT THEIR RESPONDS ENDS IN 404 PRINT UNKNOWN ENDPOINT TO THE WEBPAGE:

const unknownEndpoint = (request, response) => {

    response.status(404).send({ error: 'unknown endpoint' });
}

// GET root

app.get('/', (request, response) => {
    response.send('<h1>Main Mauri\'s Phone book server page.</h1>');
});

// GET all persons

app.get('/api/persons', (request, response) => {
    Person.find({ }).then(persons => {
        response.json(persons);
    });
});

app.get('/info', (request, response) => {

   response.send('<p> The Phone book has info for ' + persons.length + 'people </p>'
       + '<br/>'
       + Date());
});

// GET a person by id

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id);
    const person = persons.find(note => note.id === id);

    if (person) {

        response.json(person);
    } else {
        response.status(404).end();
    }
});

// DELETE - delete a person

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

// POST / create a person

app.post('/api/persons/', (request, response) => {

    const body = request.body;

    if (body.name === undefined || body.phone === undefined) {

        return response.status(400).json({error: 'content missing'});
    }

    const person = new Person({
        name: body.name,
        phone: body.phone,
    });

    person.save()
        .then(savedPerson => {
        response.json(savedPerson);
    });
});

const createRandomId = () => Math.floor(Math.random() * 10000);

app.use(unknownEndpoint);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
