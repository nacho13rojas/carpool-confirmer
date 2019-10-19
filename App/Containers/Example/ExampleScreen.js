import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import { Images } from 'App/Theme'


class ExampleScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isDriver: false,
      isPassenger: false,
    }
  }

  componentDidMount() {

  }

  onDriverClick = () => {
    this.setState({ isDriver: true, isPassenger: false })
  }

  onPassengerClick = () => {
    this.setState({ isDriver: false, isPassenger: true })
  }

  render() {
    console.log(this.state)
    const { isDriver, isPassenger } = this.state

    return (
      <View style={Style.container}>
        <Text style={Style.text}>Validar carona</Text>

        <View style={Style.buttonsContainer}>
          <Button onPress={this.onDriverClick} color={ isDriver ? "rgb(33, 150, 243)" : "rgb(125, 125, 125)" } title="Motorista" />
          <Button onPress={this.onPassengerClick} color={ isPassenger ? "rgb(33, 150, 243)" : "rgb(125, 125, 125)" } title="Caroneiro" />
        </View>

        { isDriver ? (
          <Text style={Style.text}>QRCode</Text>
        ) : 
        isPassenger ? (
          <Text style={Style.instructions}>Camera</Text>
        ) :
          null 
        }
        <Button onPress={() => this._fetchUser()} title="Compartilhar localização" />
      </View>
    )
  }
}

ExampleScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
