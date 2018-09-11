import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

class RecipeInput extends Component {
    state = {
        recipeName: ''
    };

    recipeNameChangedHandler = value => {
        this.setState({
            recipeName: value
        });
    };

    recipeSubmitHandler = () => {
        if (this.state.recipeName.trim() === "") {
          return;
        }
        
        this.props.onRecipeAdded(this.state.recipeName);
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.recipeInput}
                    placeholder="Enter a recipe name"
                    value={this.state.recipeName}
                    onChangeText={this.recipeNameChangedHandler} 
                />
                <Button 
                title="Add"
                style={styles.recipeButton} 
                onPress={this.recipeSubmitHandler} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        //flex: 1,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
      },
      recipeInput: {
        width: '70%'
      },
      recipeButton: {
        width: '30%'
      }
});

export default RecipeInput;