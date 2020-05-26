const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const url = process.env.MONGODB_URI;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
console.log('Connecting to: ', url);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('Connected to mongoDB');
    })
    .catch((error) => {
        console.log('error connecting to mongoDB', error.message());
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        minlength: 8,
        required: true
    },
});

personSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator' });

personSchema.set('toJSON', {

    transform: (document, returnedPerson) => {

        returnedPerson.id = returnedPerson._id.toString();
        delete returnedPerson._id;
        delete returnedPerson.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);