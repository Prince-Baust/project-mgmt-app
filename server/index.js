const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 4000;
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

//Connect DB
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))



app.listen(port, () => console.log(`Server started at port: ${port}`));