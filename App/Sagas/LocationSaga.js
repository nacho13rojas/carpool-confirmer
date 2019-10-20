import { put, call, delay } from 'redux-saga/effects';
import axios from "axios";
import { sendLocationSuccess, sendLocationFail, setDriverDistance } from 'App/Stores/location/LocationActions'
import { Config } from 'App/Config'


export const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

export function* sendLocation(id, isDriver, position) {
  console.log('sendLocation saga')
  const baseUrl = Config.API_URL;
  try {
      // const response = yield call(axios.post(baseUrl, { id, position }, options))
      yield delay(1000)
      const response = { data: { driverDistance: 3 }};
      yield put(sendLocationSuccess());
      if (!isDriver) {
        yield put(setDriverDistance(response.data.driverDistance));
      }
  } catch (error) {
      yield put(sendLocationFail(error));
  }
}