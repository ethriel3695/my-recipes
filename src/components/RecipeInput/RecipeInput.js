import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const recipeInput = props => (
    <DefaultInput 
        placeholder="Recipe Name" 
        value={props.recipeData.value} 
        onChangeText={props.onChangeText}
        valid={props.recipeData.valid}
        touched={props.recipeData.touched} />
);

export default recipeInput;