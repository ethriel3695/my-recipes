import React, { Component } from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../store/actions/index';

class recipeDetail extends Component {
    recipeDeletedHandler = () => {
        this.props.onDeleteRecipe(this.props.selectedRecipe.key);
        this.props.navigator.pop();
    };
    render () {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={this.props.selectedRecipe.image}
                        style={styles.recipeImage} />
                    <Text style={styles.recipeName}>
                        {this.props.selectedRecipe.name}
                    </Text>
                    <TouchableOpacity onPress={this.recipeDeletedHandler}>
                    <View style={styles.deleteButton}>
                        <Icon 
                        size={30} 
                        name="ios-trash"
                        color="red" />
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        margin: 22
    },
    recipeImage: {
        width: "100%",
        height: 200
    },
    recipeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeleteRecipe: (key) => dispatch(deleteRecipe(key))
    };
};

export default connect(null, mapDispatchToProps)(recipeDetail);