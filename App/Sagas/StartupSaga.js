import { put, delay } from 'redux-saga/effects'
import NavigationService from 'App/services/NavigationService'


export function* startup() {
  // yield put(Actions.fetchUser())
  yield delay(1000)
  NavigationService.navigateAndReset('ValidateRideScreen')
}
