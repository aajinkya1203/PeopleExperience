import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

// components
import BlogList from './components/BlogList'

// apollo client set up
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client = { client } >
      <div id="App">
        <h1>Let everyone know...</h1>
        <p><i>Help Us Create Awareness by sharing your story!</i></p>
        <BlogList />
      </div>
    </ApolloProvider>
  );
}

export default App;
