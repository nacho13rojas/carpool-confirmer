import * as types from '../action-types';

const INITIAL_STATE = {
  position: null,
  driverDistance: null,
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_LOCATION:
      return { 
          ...state, 
          loading: true,
          error: null
        };
    case types.GET_LOCATION_SUCCESS:
      return {
        ...state,
        position: action.payload,
        loading: false
      };
    case types.GET_LOCATION_FAIL:
      return { 
          ...state,
          error: action.payload,
          loading: false
        };
    case types.SET_DRIVER_DISTANCE:
      return { 
          ...state,
          driverDistance: action.payload,
          loading: false
        };
    default:
      return state;
  }
};
