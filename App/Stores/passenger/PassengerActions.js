import * as types from '../action-types'


export const getPassengerId = () => ({
   type: types.GET_PASSENGER_ID
})

export const getPassengerIdSuccess = (id) => ({
   type: types.GET_PASSENGER_ID_SUCCESS,
   payload: id
})

export const getPassengerIdFail = (error) => ({
   type: types.GET_PASSENGER_ID_FAIL,
   payload: error
})
