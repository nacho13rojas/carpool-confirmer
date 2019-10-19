import React from 'react'
import { 
  Text, 
  View, 
  Button, 
  Alert,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './LocationSharingScreenStyle'
import { Images } from 'App/Theme'
import Geolocation from '@react-native-community/geolocation';


class LocationSharingScreen extends React.Component {

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
        this.setState({ position });
        console.log(position)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <View style={Style.container}>
        <Text style={Style.title}>Validando geolocalização</Text>
        <View style={Style.locationContainer}>
            <Text style={Style.text}>Ícone de geolocalização</Text>
            <View style={Style.distanceContainer}>
                <TouchableOpacity
                    style={Style.button}
                    onPress={this.getLocation}>
                <Text>Compartilhar localização</Text>
                </TouchableOpacity>
                <Text style={Style.distanceTitle}>Distância do motorista</Text>
                <Text style={Style.text}>600m</Text>
            </View>
        </View>
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
)(LocationSharingScreen)
