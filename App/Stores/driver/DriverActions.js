import * as types from '../action-types'


export const getDriverId = () => ({
   type: types.GET_DRIVER_ID
})

export const getDriverIdSuccess = (id) => ({
   type: types.GET_DRIVER_ID_SUCCESS,
   payload: id
})

export const getDriverIdFail = (error) => ({
   type: types.GET_DRIVER_ID_FAIL,
   payload: error
})

