import * as types from '../action-types'
import Geolocation from '@react-native-community/geolocation';


export const getLocation = () => ({
   type: types.GET_LOCATION
})

export const getLocationSuccess = (position) => ({
   type: types.GET_LOCATION_SUCCESS,
   payload: position
})

export const getLocationFail = (error) => ({
   type: types.GET_LOCATION_FAIL,
   payload: error
})


export const sendLocation = (payload) => ({
   type: types.SEND_LOCATION,
   payload: payload
})

export const sendLocationSuccess = () => ({
   type: types.SEND_LOCATION_SUCCESS
})

export const sendLocationFail = (error) => ({
   type: types.SEND_LOCATION_FAIL,
   payload: error
})


export const setDriverDistance = (distance) => ({
   type: types.SET_DRIVER_DISTANCE,
   payload: distance
})