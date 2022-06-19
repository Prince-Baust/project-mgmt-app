const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))



app.listen(port, () => console.log(`Server started at port: ${port}`));