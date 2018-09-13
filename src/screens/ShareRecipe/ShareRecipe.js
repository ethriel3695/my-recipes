import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { addRecipe } from '../../store/actions/index';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import RecipeInput from '../../components/RecipeInput/RecipeInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class ShareRecipeScreen extends Component {
  state = {
    recipeName: ""
  };
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

  recipeNameChangedHandler = val => {
    this.setState({
      recipeName: val
    });
  };

  recipeAddedHandler = () => {
    if (this.state.recipeName.trim() !== "") {
      this.props.onAddRecipe(this.state.recipeName);
    }
  };
    render () {
        return (
          <ScrollView>
          <View style={styles.container}>
            <MainText>
              <HeadingText>
              Share a Recipe
              </HeadingText>
            </MainText>
            <PickImage />
            <PickLocation />
            <RecipeInput 
              recipeName={this.state.recipeName}
              onChangeText={this.recipeNameChangedHandler} />
            <View style={styles.button}>
              <Button 
                title="Share Recipe"
                onPress={this.recipeAddedHandler} />
            </View>
          </View>  
          </ScrollView>  
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddRecipe: (recipeName) => dispatch(addRecipe(recipeName))
  };
};

export default connect(null, mapDispatchToProps)(ShareRecipeScreen);