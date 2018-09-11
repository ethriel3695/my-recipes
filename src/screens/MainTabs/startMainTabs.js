import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("md-share-alt", 30),
        Icon.getImageSource("md-menu", 30)
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