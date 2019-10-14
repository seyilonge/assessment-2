import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import Reducers, { defaultState } from './modules';

const loggerMiddleware = createLogger();
const RootReducer = combineReducers( { ...Reducers } );
const store = ( preloadedState = { ...defaultState } ) => {
    return createStore( RootReducer, preloadedState = {...defaultState}, composeWithDevTools(
        applyMiddleware(
            loggerMiddleware,
            promiseMiddleware,
            thunkMiddleware
        )
    ) );
}

export default store;
