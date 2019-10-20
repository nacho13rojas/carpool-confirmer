import { put, call, delay } from 'redux-saga/effects'
import NavigationService from 'App/Services/NavigationService'


export function* startup() {
  // yield put(Actions.fetchUser())
  yield delay(1000)
  NavigationService.navigateAndReset('ValidateRideScreen')
}
