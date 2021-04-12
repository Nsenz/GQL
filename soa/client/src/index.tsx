import ReactDOM from 'react-dom';
import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react';
import { App } from './app';
import './reset.st.css';

const httpLink = new HttpLink({uri: 'http://localhost:4001/graphql'});

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });

    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.body.appendChild(document.createElement('div'))
);
