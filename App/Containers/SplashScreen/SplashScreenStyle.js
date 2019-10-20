import { StyleSheet } from 'react-native'
import Fonts from 'App/theme/Fonts'
import ApplicationStyles from 'App/theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Fonts.style.h2,
    textAlign: 'center',
    margin: 20,
  },
})
