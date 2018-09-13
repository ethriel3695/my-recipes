import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "my-recipes.FindRecipeScreen",
                    label: "Find Recipe",
                    title: "Find Recipe",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "my-recipes.ShareRecipeScreen",
                    label: "Share Recipe",
                    title: "Share Recipe",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            drawer: {
                left: {
                    screen: "my-recipes.SideDrawer"
                }
            }
        });
    });
};

export default startTabs;