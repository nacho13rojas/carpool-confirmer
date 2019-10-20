import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/sagas'
import DriverReducer from './driver/DriverReducer'
import PassengerReducer from './passenger/PassengerReducer'
import LocationReducer from './location/LocationReducer'

export default () => {
  const rootReducer = combineReducers({
    driver: DriverReducer,
    passenger: PassengerReducer,
    location: LocationReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
