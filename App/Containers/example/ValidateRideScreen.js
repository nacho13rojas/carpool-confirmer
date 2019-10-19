import React from 'react'
import { 
  Platform, 
  Text, 
  View, 
  Button, 
  ActivityIndicator, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ValidateRideScreenStyle'
import { Images } from 'App/Theme'
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Geolocation from '@react-native-community/geolocation';
import NavigationService from '../../Services/NavigationService'


class ValidateRideScreen extends React.Component {

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

  onSuccess = (e) => {
    console.log(e.data)
    Alert.alert(e.data);
    NavigationService.navigate('LocationSharingScreen')
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({ position });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    const { isDriver, isPassenger, qrCodeValueString } = this.state

    return (
      <View style={Style.container}>
        <Text style={Style.title}>Validar carona</Text>

        <View style={Style.buttonsContainer}>
          <TouchableOpacity
              style={[Style.button, isDriver ? { backgroundColor: "rgb(126, 181, 237)" } : null ]}
              onPress={this.onDriverClick}>
            <Text>Motorista</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[Style.button, isPassenger ? { backgroundColor: "rgb(126, 181, 237)" } : null ]}
              onPress={this.onPassengerClick}>
            <Text>Caroneiro</Text>
          </TouchableOpacity>
        </View>

        { isDriver ? (
          <View style={Style.driverContainer}>
            <View style={Style.qrcodeContainer}>
              <QRCode
                value={qrCodeValueString}
              />
            </View>
            <TouchableOpacity
                style={Style.button}
                onPress={this.getLocation}>
              <Text>Compartilhar localização</Text>
            </TouchableOpacity>
          </View>
        ) : 
        isPassenger ? (
          <View style={Style.passengerContainer}>
            <QRCodeScanner
              onRead={this.onSuccess}
              cameraStyle={Style.cameraContainer}
            />        
          </View>

      ) :
          null 
        }
      </View>
    )
  }
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
)(ValidateRideScreen)
