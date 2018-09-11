import { ADD_RECIPE, DELETE_RECIPE } from './actionTypes';

export const addRecipe = (recipeName) => {
    return {
        type: ADD_RECIPE,
        recipeName: recipeName
    };
};

export const deleteRecipe = (key) => {
    return {
        type: DELETE_RECIPE,
        recipeKey: key
    };
};