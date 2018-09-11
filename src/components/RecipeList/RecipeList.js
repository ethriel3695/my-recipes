import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from '../ListItem/ListItem';

const recipeList = props => {
    return (
        <FlatList 
            style={styles.listContainer}
            data={props.recipes}
            renderItem={(info) => (
                <ListItem 
                    recipeName={info.item.name} 
                    recipeImage={info.item.image}
                    onItemPressed={() => props.onItemSelected(info.item.key)} />
            )} />
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
  });

export default recipeList;