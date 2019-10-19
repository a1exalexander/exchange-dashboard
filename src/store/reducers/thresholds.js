import {
  THRESHOLDS_REQUEST,
  THRESHOLDS_SUCCESS,
  THRESHOLDS_FAILURE,
  THRESHOLDS_UPDATE
} from '../../constants';

const thresholdsReducer = (state, action) => {

  if (state === undefined) {
    return {
      loading: false,
      hasError: false,
      thresholds: [],
    };
  }

  switch (action.type) {
    case THRESHOLDS_REQUEST:
      return {
        ...state.thresholdsState,
        loading: true,
        hasError: false
      };
    case THRESHOLDS_SUCCESS:
      return {
        ...state.thresholdsState,
        loading: false,
        hasError: false
      };
    case THRESHOLDS_FAILURE:
      return {
        ...state.thresholdsState,
        loading: false,
        hasError: true
      };
    case THRESHOLDS_UPDATE:
      return {
        ...state.thresholdsState,
        thresholds: [...action.payload],
      };
    default:
      return state.thresholdsState;
  }
};

export default thresholdsReducer;
