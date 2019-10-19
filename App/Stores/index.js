import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ExampleReducer } from './Example/Reducers'
import DriverReducer from './driver/DriverReducer'
import PassengerReducer from './passenger/PassengerReducer'

export default () => {
  const rootReducer = combineReducers({
    example: ExampleReducer,
    driver: DriverReducer,
    passenger: PassengerReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
