import React from 'react'
import { 
  Text, 
  View, 
  Image, 
  Alert,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator, 
} from 'react-native'
import { connect } from 'react-redux'
import { getLocation, getLocationSuccess, getLocationFail, sendLocation } from 'App/stores/location/LocationActions'
import Style from './LocationSharingScreenStyle'
import { Images } from 'App/theme'
import Geolocation from '@react-native-community/geolocation';


class LocationSharingScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      position: null,
    }
  }

  getLocation = () => {
    const { driverId, getLocation, sendLocation } = this.props
    getLocation()
    Geolocation.getCurrentPosition(
      position => {
        this.setState({ position })
        ToastAndroid.show(`latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`, ToastAndroid.LONG);
        getLocationSuccess()
        sendLocation(driverId, position, false)
      },
      error => {
        getLocationFail(error.message)
        Alert.alert(error.message)
      });
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    const { driverDistance, loading } = this.props;
    return (
      <View style={Style.container}>
        <Text style={Style.title}>Validando geolocalização</Text>
        <View style={Style.locationContainer}>
          <Image
              style={{width: 50, height: 50, alignSelf: 'center'}}
              source={Images.location}
          />            
          <View style={Style.distanceContainer}>
            { loading ? 
              <ActivityIndicator size="small" color="#0000ff" />
            :
              <TouchableOpacity
                style={Style.button}
                onPress={this.getLocation}>
                <Text>Compartilhar localização</Text>
              </TouchableOpacity>
            }
            { driverDistance ? 
              <View>
                  <Text style={Style.distanceTitle}>Distância do motorista</Text>
                  <Text style={Style.text}>{ driverDistance }m</Text>
              </View>
            :
              null
            }
          </View>
        </View>
      </View>
    )
  }
}


const mapStateToProps = ({ driver, passenger, location }) => ({
  driverId: driver.id,
  passengerId: passenger.id,
  driverDistance: location.driverDistance,
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
)(LocationSharingScreen)
