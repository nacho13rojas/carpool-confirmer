import { takeLatest, all } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { startup } from './StartupSaga'
import { sendLocation } from './LocationSaga'
import * as types from '../Stores/action-types'


export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(types.SEND_LOCATION, sendLocation),
  ])
}
