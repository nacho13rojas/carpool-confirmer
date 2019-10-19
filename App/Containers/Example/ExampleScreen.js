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
import Style from './ExampleScreenStyle'
import { Images } from 'App/Theme'
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Geolocation from '@react-native-community/geolocation';


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

  onSuccess = (e) => {
    console.log(e.data)
    Alert.alert(e.data);
    
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        this.setState({ location });
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
          <QRCodeScanner
            onRead={this.onSuccess}
            topContent={
              <Text style={styles.centerText}>
                Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />        
      ) :
          null 
        }
        <Button onPress={this.getLocation} title="Compartilhar localização" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

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
