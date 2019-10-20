import React, { Component } from 'react'
import NavigationService from 'App/services/NavigationService'
import AppNavigator from 'App/navigators/AppNavigator'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import { connect } from 'react-redux'
import { startup } from 'App/stores/Startup/Actions'

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
