import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import { Images } from 'App/Theme'
import QRCode from 'react-native-qrcode-svg';


class ExampleScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isDriver: false,
      isPassenger: false,
      qrCodeValueString: '',
    }
  }

  componentDidMount() {
    const { driverId } = this.props;
    const qrCodeValue = { driverId, date: new Date() }
    this.setState({ qrCodeValueString: JSON.stringify(qrCodeValue) })
  }

  onDriverClick = () => {
    this.setState({ isDriver: true, isPassenger: false })
  }

  onPassengerClick = () => {
    this.setState({ isDriver: false, isPassenger: true })
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    const { isDriver, isPassenger, qrCodeValueString } = this.state

    return (
      <View style={Style.container}>
        <Text style={Style.text}>Validar carona</Text>

        <View style={Style.buttonsContainer}>
          <Button onPress={this.onDriverClick} color={ isDriver ? "rgb(33, 150, 243)" : "rgb(125, 125, 125)" } title="Motorista" />
          <Button onPress={this.onPassengerClick} color={ isPassenger ? "rgb(33, 150, 243)" : "rgb(125, 125, 125)" } title="Caroneiro" />
        </View>

        { isDriver ? (
          <View style={Style.qrcodeContainer}>
            <QRCode
              value={qrCodeValueString}
            />
          </View>
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

const mapStateToProps = ({ example, driver, passenger }) => ({
  user: example.user,
  userIsLoading: example.userIsLoading,
  userErrorMessage: example.userErrorMessage,
  liveInEurope: liveInEurope(example),
  driverId: driver.id,
  // driver: driver,
  passengerId: passenger.id,
  // passenger: passenger,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
