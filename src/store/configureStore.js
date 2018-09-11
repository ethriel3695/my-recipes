import { createStore, combineReducers } from 'redux';
import recipesReducer from './reducers/recipes';
const rootReducer = combineReducers({
    recipes: recipesReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;