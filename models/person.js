const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    minlength: 8,
    required: true,
  },
});

personSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

personSchema.set('toJSON', {

  transform: (document, returnedPerson) => {
    // eslint-disable-next-line no-underscore-dangle,no-param-reassign
    returnedPerson.id = returnedPerson._id.toString();
    // eslint-disable-next-line no-param-reassign,no-underscore-dangle
    delete returnedPerson._id;
    // eslint-disable-next-line no-param-reassign,no-underscore-dangle
    delete returnedPerson.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
