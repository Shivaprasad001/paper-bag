const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3001;

console.log('App started at PORT '+ PORT);
app.listen(PORT);