import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const recipeInput = props => (
    <DefaultInput 
        placeholder="Recipe Name" 
        value={props.recipeName} 
        onChangeText={props.onChangeText} />
);

export default recipeInput;