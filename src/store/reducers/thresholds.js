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
        ...state.thresholdsModule,
        loading: true,
        hasError: false
      };
    case THRESHOLDS_SUCCESS:
      return {
        ...state.thresholdsModule,
        loading: false,
        hasError: false
      };
    case THRESHOLDS_FAILURE:
      return {
        ...state.thresholdsModule,
        loading: false,
        hasError: true
      };
    case THRESHOLDS_UPDATE:
      return {
        ...state.thresholdsModule,
        thresholds: [...action.payload],
      };
    default:
      return state.thresholdsModule;
  }
};

export default thresholdsReducer;
