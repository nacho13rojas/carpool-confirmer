import { createAppContainer, createStackNavigator } from 'react-navigation'

import ValidateRideScreen from 'App/Containers/validateRide/ValidateRideScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import LocationSharingScreen from 'App/Containers/locationSharing/LocationSharingScreen'


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
