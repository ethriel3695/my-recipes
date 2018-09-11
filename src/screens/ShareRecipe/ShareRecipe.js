import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RecipeInput from '../../components/RecipeInput/RecipeInput';
import { connect } from 'react-redux';
import { addRecipe } from '../../store/actions/index';

class ShareRecipeScreen extends Component {
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

  recipeAddedHandler = recipeName => {
    this.props.onAddRecipe(recipeName);
  };
    render () {
        return (
          <View>
            <RecipeInput onRecipeAdded={this.recipeAddedHandler} />
          </View>  
        );
    }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddRecipe: (recipeName) => dispatch(addRecipe(recipeName))
  };
};

export default connect(null, mapDispatchToProps)(ShareRecipeScreen);