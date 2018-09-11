import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const listItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Image 
                resizeMode="cover"
                source={props.recipeImage}
                style={styles.recipeImage} />
            <Text>{props.recipeName}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
   listItem: {
       width: "100%",
       padding: 10,
       backgroundColor: "#eee",
       marginBottom: 5,
       flexDirection: "row",
       alignItems: "center"
   },
   recipeImage: {
       marginRight: 8,
       height: 30,
       width: 30
   }
});

export default listItem;