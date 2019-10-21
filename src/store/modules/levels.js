import {
  LEVELS_REQUEST,
  LEVELS_SUCCESS,
  LEVELS_FAILURE,
  LEVELS_UPDATE
} from '../../constants';

const levelsModule = {
  loading: false,
  hasError: false,
  chart: [],
  support: [],
  resistance: [],
};

const levelsReducer = (state = { levelsModule }, action) => {

  switch (action.type) {
    case LEVELS_REQUEST:
      return {
        ...state.levelsModule,
        loading: true,
        hasError: false
      };
    case LEVELS_SUCCESS:
      return {
        ...state.levelsModule,
        loading: false,
        hasError: false
      };
    case LEVELS_FAILURE:
      return {
        ...state.levelsModule,
        loading: false,
        hasError: true
      };
    case LEVELS_UPDATE:
      return {
        ...state.levelsModule,
        ...action.payload,
      };
    default:
      return state.levelsModule;
  }
};

export default levelsReducer;
