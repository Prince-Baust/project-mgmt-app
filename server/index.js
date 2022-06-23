const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 4000;
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const path = require('path');

//Connect DB
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

// Serve frontend
if (process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}



app.listen(port, () => console.log(`Server started at port: ${port}`));