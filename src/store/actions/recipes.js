import { SET_RECIPES, REMOVE_RECIPE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addRecipe = (recipeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch('https://us-central1-my-recipes-216614.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            alert('Something went wrong, please try again!');
            dispatch(uiStopLoading());   
        })
        .then(res => res.json())
        .then(parseRes => {
            const recipeData = {
                name: recipeName,
                location: location,
                image: parseRes.imageUrl
            };
            return fetch('https://my-recipes-216614.firebaseio.com/recipes.json', {
                method: 'POST',
                body: JSON.stringify(recipeData)
            })
        })
        .then(res => res.json())
        .then(parseRes => {
            console.log(parseRes);
            dispatch(uiStopLoading());
        }).catch(err => {
            console.log(err);
            alert('Something went wrong, please try again!');
            dispatch(uiStopLoading());   
        })
    };
};

export const getRecipes = () => {
    return dispatch => {
        fetch('https://my-recipes-216614.firebaseio.com/recipes.json')
        .catch(err => {
            alert('Something went wrong!');
            console.log(err);
        })
        .then(res => res.json())
        .then(parseRes => {
            const recipes = [];
            for (let key in parseRes) {
                recipes.push({
                    ...parseRes[key],
                    image: {
                        uri: parseRes[key].image
                    },
                    key: key
                });
            }
            dispatch(setRecipes(recipes));
        })
    };
};

export const setRecipes = recipes => {
    return {
        type: SET_RECIPES,
        recipes: recipes
    };
};

export const deleteRecipe = (key) => {
    return dispatch => {
        dispatch(removeRecipe(key));
        return fetch(`https://my-recipes-216614.firebaseio.com/recipes/${key}.json`, {
            method: 'DELETE'
        })
        .catch(err => {
            alert('Something went wrong!');
            console.log(err);
        })
        .then(res => res.json())
        .then(parseRes => {
            console.log('Deleted!');
        })
    }
};

export const removeRecipe = key => {
    return {
        type: REMOVE_RECIPE,
        key: key
    };
};