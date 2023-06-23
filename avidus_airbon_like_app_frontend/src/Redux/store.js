import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as AuthReducer } from './Auth/reducer';

const rootReducer = combineReducers({
    AuthReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
);