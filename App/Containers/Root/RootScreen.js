import React, { Component } from 'react'
import NavigationService from 'App/Services/NavigationService'
import AppNavigator from 'App/Navigators/AppNavigator'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import { connect } from 'react-redux'
import { startup } from 'App/Stores/Startup/Actions'

class RootScreen extends Component {
  componentDidMount() {
    this.props.startup()
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(startup()),
})

export default connect(
  null,
  mapDispatchToProps
)(RootScreen)
