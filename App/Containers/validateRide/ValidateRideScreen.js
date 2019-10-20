import React from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { getLocation, getLocationSuccess, getLocationFail, sendLocation } from 'App/stores/location/LocationActions'
import Style from './ValidateRideScreenStyle'
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Geolocation from '@react-native-community/geolocation';
import NavigationService from '../../services/NavigationService'


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
    const driverInfo = JSON.parse(e.data)
    ToastAndroid.show(`driverId: ${driverInfo.driverId}, date: ${driverInfo.date}`, ToastAndroid.LONG);
    NavigationService.navigate('LocationSharingScreen')
  }

  getLocation = () => {
    const { driverId, getLocation, sendLocation } = this.props
    getLocation()
    Geolocation.getCurrentPosition(
      position => {
        this.setState({ position })
        ToastAndroid.show(`latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`, ToastAndroid.LONG);
        getLocationSuccess()
        sendLocation(driverId, position, true)
      },
      error => {
        getLocationFail(error.message)
        Alert.alert(error.message)
      }
    );
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    const { isDriver, isPassenger, qrCodeValueString } = this.state
    const { loading } = this.props

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
            { loading ? 
              <ActivityIndicator size="small" color="#0000ff" />
            :
              <TouchableOpacity
                style={Style.button}
                onPress={this.getLocation}>
                <Text>Compartilhar localização</Text>
            </TouchableOpacity>
            }
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


const mapStateToProps = ({ driver, passenger, location }) => ({
  driverId: driver.id,
  passengerId: passenger.id,
  loading: location.loading,
})

const mapDispatchToProps = (dispatch) => ({
  getLocation: () => dispatch(getLocation()),
  getLocationSuccess: () => dispatch(getLocationSuccess()),
  getLocationFail: () => dispatch(getLocationFail()),
  sendLocation: () => dispatch(sendLocation()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidateRideScreen)
