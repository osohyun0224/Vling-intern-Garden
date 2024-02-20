import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:5100/graphql'
});

const client = new ApolloClient({
  link: httpLink, 
  cache: new InMemoryCache(),
});

export default client;
