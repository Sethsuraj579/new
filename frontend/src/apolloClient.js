import { ApolloClient, InMemoryCache} from '@apollo/client';
import { createHttpLink } from '@apollo/client/link/http';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL || 'http://localhost:8000/graphql/',
  credentials: 'include',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});