const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config/keys');
const cors = require('cors');

const app = express();
app.use(cors());

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect( MONGODB_URI, options )
mongoose.connection.once("connected",()=>{
    console.log("Connected to the Database!")
})
mongoose.connection.on("error",()=>{
    console.log("Oopsie! This is embarassing! Try again!")
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000,()=>{
    console.log("Listening for requests on Port 4000...");
})