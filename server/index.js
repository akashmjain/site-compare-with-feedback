const express = require('express');
const bodyParser  = require('body-parser');
// const mongodb = require('mongodb');
const cors = require('cors');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());


const comments = require('./routes/api/comments');
app.use('/api/comments', comments);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`) )
