const personRouter = require('express').Router();
const Person = require('../models/person');
const logger = require('../utils/logger');

// GET root

personRouter.get('/main', (req, res) => {
  res.send('<h1>Main Mauri\'s Phone book server page.</h1>');
});

// INFO (How much persons in MongoDB & Date.now)

personRouter.get('/info', (request, response) => {
  Person.countDocuments({}, (err, result) => {
    if (err) {
      logger.error(err);
    } else {
      response.send(`<p>The Phone book has info for ${result} people </p>`
        + `<br/>${
          Date()}`);
    }
  });
});

// GET all persons

personRouter.get('/', (request, response) => {
  Person.find({ }).then((persons) => {
    response.json(persons);
  });
});

// GET a person by id

personRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST / create a person

// eslint-disable-next-line consistent-return
personRouter.post('/', (request, response, next) => {
  const { body } = request;

  if (body.name === undefined || body.phone === undefined) {
    return response.status(400).json({ error: 'content missing' });
  }

  const person = new Person({
    name: body.name,
    phone: body.phone,
  });

  person
    .save()
    .then((savedPerson) => response.json(savedPerson.toJSON()))
    .catch((error) => next(error));
});

// DELETE - delete a person

personRouter.delete('/:id', (request, response, next) => {

  Person.findByIdAndRemove(request.params.id)

    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// PUT - Update an existing record:

personRouter.put('/:id', (req, res, next) => {
  const { body } = req;

  if (!body || !body.name || !body.phone) {
    res.status(400).json({ error: 'content missing' });
  }

  const person = {
    name: body.name,
    phone: body.phone,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personRouter;
