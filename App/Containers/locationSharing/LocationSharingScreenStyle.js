import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'


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
  distanceTitle: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 40,
  },
  text: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
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
  locationContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  distanceContainer: {
    alignItems: 'center',
  },
  distanceInfoContainer: {
    alignItems: 'center',
  },
 })
