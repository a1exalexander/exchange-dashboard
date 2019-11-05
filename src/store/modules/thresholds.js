import {
  THRESHOLDS_REQUEST,
  THRESHOLDS_SUCCESS,
  THRESHOLDS_FAILURE,
  THRESHOLDS_UPDATE,
  THRESHOLDS_UPDATE_ALERT
} from '../../constants';

const thresholdsModule = {
  loading: false,
  hasError: false,
  thresholds: [],
  volume_1m: '',
  volume_5m: '',
  volume_1h: '',
  volume_1d: '',
  resistance: '',
  OPEN_INTEREST: '',
  support: '',
};

const thresholdsReducer = (state = { thresholdsModule }, action) => {

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
    case THRESHOLDS_UPDATE_ALERT:
      return {
        ...state.thresholdsModule,
        ...action.payload,
      };
    default:
      return state.thresholdsModule;
  }
};

export default thresholdsReducer;
