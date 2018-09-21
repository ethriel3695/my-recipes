import React, { Component } from 'react';
import { Modal, View, Image, Text, Button
    , StyleSheet, TouchableOpacity
    , Platform, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../store/actions/index';

class recipeDetail extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 
        ? 'portrait' : 'landscape'
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    };

    componentWillUnmount() {
       Dimensions.removeEventListener('change', this.updateStyles);
    };
    
    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    };
    recipeDeletedHandler = () => {
        this.props.onDeleteRecipe(this.props.selectedRecipe.key);
        this.props.navigator.pop();
    };
    render () {
        return (
            <View 
                style={[styles.container,
                this.state.viewMode === 'portrait'
                ? styles.portraitContainer
                : styles.landscapeContainer]}>
                <View style={styles.recipeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image source={this.props.selectedRecipe.image}
                            style={styles.recipeImage} />
                    </View>
                    <View style={styles.subContainer}>
                        <MapView
                            initialRegion={{
                                ...this.props.selectedRecipe.location,
                                latitudeDelta: 0.0122,
                                longitudeDelta: Dimensions.get('window').width / 
                                    Dimensions.get('window').height * 0.0122
                            }}
                            style={styles.map} >
                            <MapView.Marker 
                                coordinate={this.props.selectedRecipe.location} />
                        </MapView>
                    </View>
                </View>
                    <View style={styles.subContainer}>
                        <View>
                            <Text style={styles.recipeName}>
                                {this.props.selectedRecipe.name}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.recipeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon 
                                size={30} 
                                name={Platform.OS === 'android' 
                                ? 'md-trash' : 'ios-trash'}
                                color="red" />
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
    },
    recipeDetailContainer: {
        flex: 2
    },
    recipeImage: {
        width: "100%",
        height: "100%"
    },
    recipeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    deleteButton: {
        alignItems: "center"
    },
    subContainer: {
        flex: 1
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeleteRecipe: (key) => dispatch(deleteRecipe(key))
    };
};

export default connect(null, mapDispatchToProps)(recipeDetail);