import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/app.scss';
import App from './app/App';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {FeaturesBoundary} from './features/_util';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const httpLink = createHttpLink({uri: process.env.REACT_APP_GRAPHQL_URL});
const client   = new ApolloClient({link: httpLink, cache: new InMemoryCache()});
ReactDOM.render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <PersistGate loading={null} persistor={persistor}>
                    <FeaturesBoundary>
                        <App/>
                    </FeaturesBoundary>
                </PersistGate>
            </ApolloProvider>
        </Provider>
    </LocalizationProvider>
    ,
    document.getElementById('root'),
);
