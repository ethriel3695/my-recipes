import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import recipesReducer from './reducers/recipes';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
    recipes: recipesReducer,
    ui: uiReducer
});

let composeEnhancers = compose;

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;