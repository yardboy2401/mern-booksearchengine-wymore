//imports for react, react-router-dom, setContext, Search/SavedBooks and Navbar
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//graphql createHttp link
const httpLink = createHttpLink({
  uri: '/graphql',
});

//grabbing local storage token auth info for setContext
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//new ApolloClient link/cache setup
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//the return with routes and components/pages for App function
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
            <Switch>
              <Route exact path='/' component={SearchBooks} />
              <Route exact path='/saved' component={SavedBooks} />
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
            </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

//export App
export default App;