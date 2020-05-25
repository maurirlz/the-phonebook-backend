const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI;
console.log('Connecting to: ', url);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('Connected to mongoDB');
    })
    .catch((error) => {
        console.log('error connecting to mongoDB', error.message());
    });

const personSchema = new mongoose.Schema({
    name: String,
    phone: String,
});

personSchema.set('toJSON', {

    transform: (document, returnedPerson) => {

        returnedPerson.id = returnedPerson._id.toString();
        delete returnedPerson._id;
        delete returnedPerson.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);