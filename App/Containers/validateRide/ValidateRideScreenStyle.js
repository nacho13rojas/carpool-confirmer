import { StyleSheet } from 'react-native'
import Fonts from 'App/theme/Fonts'
import ApplicationStyles from 'App/theme/ApplicationStyles'


export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    margin: 30,
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    ...Fonts.style.normal,
    textAlign: 'center',
    margin: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 35,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  driverContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  passengerContainer: {
    flex: 1,
  },
  cameraContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  qrcodeContainer: {
    alignItems: 'center',
  },
})
