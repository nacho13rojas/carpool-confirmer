import React from 'react'
import { Text, View } from 'react-native'
import styles from './SplashScreenStyle'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Carpool Confirmer</Text>
        </View>
      </View>
    )
  }
}
