import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import RecipeList from '../../components/RecipeList/RecipeList';
import { getRecipes } from '../../store/actions/index';

class FindRecipeScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  state = {
    recipesLoaded: false,
    removeAnim: new Animated.Value(1),
    recipesAnim: new Animated.Value(0)
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  };

  componentDidMount() {
    this.props.onLoadRecipes();
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

  recipesLoadedHandler = () => {
    Animated.timing(this.state.recipesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  recipesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        recipesLoaded: true
      });
      this.recipesLoadedHandler();
    });
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
      let content = (
        <Animated.View
          style={{
            opacity: this.state.removeAnim,
            transform: [
              {
                scale: this.state.removeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 1]
                })
              }
            ]
          }}>
          <TouchableOpacity onPress={this.recipesSearchHandler}>
            <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Find Recipes</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
      if (this.state.recipesLoaded) {
        content = (
          <Animated.View
          style={{
            opacity: this.state.recipesAnim}}>
            <RecipeList recipes={this.props.recipes}
              onItemSelected={this.itemSelectedHandler} />
          </Animated.View>
        );
      }
        return (
          <View 
            style={
              this.state.recipesLoaded ? null
              : styles.buttonContainer}>{content}</View>  
        );
    }
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapStateToProps = state => {
  return {
    recipes: state.recipes.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadRecipes: () => dispatch(getRecipes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindRecipeScreen);