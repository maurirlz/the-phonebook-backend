const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');

    process.exit(1);
}

const password = process.argv[2];

const url =
    `rip`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true} );

const personSchema = new mongoose.Schema({
    name: String,
    phone: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 3 && process.argv.length <= 5) {

    const person = new Person({
        name: process.argv[3],
        phone: process.argv[4]
    })

    person.save().then(result => {
        console.log(`added ${person.name} phone ${person.phone} to the phonebook.`);
        mongoose.connection.close();
    });
}

if (process.argv.length === 3) {
    Person.find({ }).then(result => {
        result.forEach(person => {
            console.log(person);
        });
        mongoose.connection.close();
    });
}
