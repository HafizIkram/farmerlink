const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.all('*', (req, res) => {
    res.status(404).send(`Route ${req.originalUrl} not found`);
});
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
}).catch(err => {
    console.log('error while connecting',err.message)
})

