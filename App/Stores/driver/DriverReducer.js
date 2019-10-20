import * as types from '../action-types';

const INITIAL_STATE = {
  id: 'driverIdMock1234',
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_DRIVER_ID:
      return { 
          ...state, 
          loading: true,
          error: null
        };
    case types.GET_DRIVER_ID_SUCCESS:
      return {
        ...state,
        id: action.payload,
        loading: false
      };
    case types.GET_DRIVER_ID_FAIL:
      return { 
          ...state,
          error: action.payload,
          loading: false
        };
    default:
      return state;
  }
};
