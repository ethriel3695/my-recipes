import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet
  , ScrollView, KeyboardAvoidingView
  , Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addRecipe } from '../../store/actions/index';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import RecipeInput from '../../components/RecipeInput/RecipeInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

class ShareRecipeScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };
  state = {
    controls: {
      recipeName: {
        value: '',
        valid: false,
        validationRules: {
          notEmpty: true
        },
        touched: false
      },
      location: {
        value: null,
        valid: false
      }
    }
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

  recipeNameChangedHandler = (key, val) => {
    let connectedValue = {};
    connectedValue = {
      ...connectedValue,
      equalTo: val
    };
    this.setState(prevState => {
      return {
        controls: {
            ...prevState.controls,
            [key]: {
                ...prevState.controls[key],
                value: val,
                valid: validate(
                    val, 
                    prevState.controls[key].validationRules, 
                    ''
                ),
                touched: true
            }
        }    
      }
    });
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          },
          image: {
            value: null,
            valid: false
          }
        }
      }
    });
  };

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    });
  };

  recipeAddedHandler = () => {
    this.props.onAddRecipe(
      this.state.controls.recipeName.value
      , this.state.controls.location.value,
      this.state.controls.image.value
      );
  };
    render () {
      let submitButton = (
        <Button 
          title='Share the Recipe!'
          color="#29aaf4"
          onPress={this.recipeAddedHandler}
          disabled={
            !this.state.controls.recipeName.valid
            || !this.state.controls.location.valid
            || !this.state.controls.image.valid} />
      );

      if(this.props.isLoading) {
        submitButton = <ActivityIndicator />;
      }

        return (
          <ScrollView>
          <KeyboardAvoidingView 
          behavior='padding'
          style={styles.container}>
            <MainText>
              <HeadingText>
              Share a Recipe
              </HeadingText>
            </MainText>
            <PickImage onImagePicked={this.imagePickedHandler} />
            <PickLocation onLocationPick={this.locationPickedHandler} />
            <RecipeInput 
              recipeData={this.state.controls.recipeName}
              onChangeText={(val) => this.recipeNameChangedHandler('recipeName', val)}
             />
            <View style={styles.button}>
              {submitButton}
            </View>
          </KeyboardAvoidingView>  
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddRecipe: (recipeName, location, image) => 
      dispatch(addRecipe(recipeName, location, image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareRecipeScreen);