import { createAppContainer, createStackNavigator } from 'react-navigation'

import ValidateRideScreen from 'App/containers/validateRide/ValidateRideScreen'
import SplashScreen from 'App/containers/splashScreen/SplashScreen'
import LocationSharingScreen from 'App/containers/locationSharing/LocationSharingScreen'


const StackNavigator = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    ValidateRideScreen: ValidateRideScreen,
    LocationSharingScreen: LocationSharingScreen,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
