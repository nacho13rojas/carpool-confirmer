import { createAppContainer, createStackNavigator } from 'react-navigation'

import ValidateRideScreen from 'App/Containers/example/ValidateRideScreen'
import SplashScreen from 'App/Containers/splashScreen/SplashScreen'
import LocationSharingScreen from 'App/Containers/locationSharing/LocationSharingScreen'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    MainScreen: ValidateRideScreen,
    LocationSharingScreen: LocationSharingScreen,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
