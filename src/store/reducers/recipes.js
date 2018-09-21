import { SET_RECIPES, REMOVE_RECIPE } from "../actions/actionTypes";

const initialState = {
    recipes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...state,
                recipes: action.recipes
            };
        case REMOVE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => {
                    return recipe.key !== action.key;
                  })
            };
        default:
            return state;
    }
};

export default reducer;