import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import RecipeList from '../../components/RecipeList/RecipeList';


class FindRecipeScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  };

  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress") {
      if(event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };
  
  itemSelectedHandler = key => {
    const selRecipe = this.props.recipes.find(recipe => {
      return recipe.key === key;
    });
    this.props.navigator.push({
      screen: "my-recipes.RecipeDetailScreen",
      title: selRecipe.name,
      passProps: {
        selectedRecipe: selRecipe
      }
    });
  };

    render () {
        return (
          <View>
            <RecipeList recipes={this.props.recipes}
            onItemSelected={this.itemSelectedHandler} />
          </View>  
        );
    }
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes.recipes
  };
};

export default connect(mapStateToProps)(FindRecipeScreen);