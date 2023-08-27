const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNNECTION_URL, {
    useNewUrlParser: true,
})
    .then(() => console.log('Connection Successful'))
    .catch((err) => console.log(`Couldn't connect to database ${err.message}`));
