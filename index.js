require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (req, res, param) => {

    if (req.method === 'POST') {

        return JSON.stringify(req.body);
    }

    return '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));

app.use(cors());

// TOKEN for displaying the request in json format.

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

const unknownEndpoint = (request, response) => {

    response.status(404).send({ error: 'unknown endpoint' });
}

app.get('/info', (request, response) => {

   response.send('<p> The Phone book has info for ' + persons.length + 'people </p>'
       + '<br/>'
       + Date());
});

// GET a person by id

app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id)
        .then(person => {
            if (person) {

            response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

// DELETE - delete a person

app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
        .then(result => {

            response.status(204).end()
        })
        .catch(error => next(error));
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

// PUT - Update an existing record:

app.put('/api/persons/:id', (req, res, next) => {

    const body = req.body;

    const person = {
        name: body.name,
        phone: body.phone
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson);
        })
        .catch(error => next(error));
});

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {


    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'Malformatted id'});
    }
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
