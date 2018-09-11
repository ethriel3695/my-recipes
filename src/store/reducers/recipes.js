import { ADD_RECIPE, DELETE_RECIPE } from "../actions/actionTypes";

const initialState = {
    recipes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECIPE:
            return {
                ...state,
                recipes: state.recipes.concat({
                    key: `${Math.random()}`, 
                    name: action.recipeName,
                    image: {
                      uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
                    }
                })
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => {
                    return recipe.key !== action.recipeKey;
                  })
            };
        default:
            return state;
    }
};

export default reducer;