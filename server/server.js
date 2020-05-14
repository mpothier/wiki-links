const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env'})

connectDB();

const options = require('./routes/options')
const entries = require('./routes/entries')

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build/'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(express.json());
app.use('/api/v1/options', options);
app.use('/api/v1/entries', entries);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));