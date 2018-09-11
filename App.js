import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import ShareRecipeScreen from './src/screens/ShareRecipe/ShareRecipe';
import FindRecipeScreen from './src/screens/FindRecipe/FindRecipe';
import RecipeDetailScreen from './src/screens/RecipeDetail/RecipeDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import configureStore from './src/store/configureStore';

const store = configureStore();

//Register Screens
Navigation.registerComponent(
  "my-recipes.AuthScreen", 
  () => AuthScreen, 
  store, 
  Provider
);
Navigation.registerComponent(
  "my-recipes.ShareRecipeScreen", 
  () => ShareRecipeScreen, 
  store, 
  Provider
);
Navigation.registerComponent(
  "my-recipes.FindRecipeScreen", 
  () => FindRecipeScreen, 
  store, 
  Provider
);
Navigation.registerComponent(
  "my-recipes.RecipeDetailScreen", 
  () => RecipeDetailScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "my-recipes.SideDrawer",
  () => SideDrawer
);

//Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: "my-recipes.AuthScreen",
    title: "Login"
  }
});