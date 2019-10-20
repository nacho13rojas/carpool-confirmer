import { takeLatest, all } from 'redux-saga/effects'
import { startup } from './StartupSaga'
import { sendLocation } from './LocationSaga'
import * as types from '../Stores/action-types'


export default function* root() {
  yield all([
    takeLatest(types.START_UP, startup),
    takeLatest(types.SEND_LOCATION, sendLocation),
  ])
}
