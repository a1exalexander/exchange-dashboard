import models from '../../models';
import {
  STAT_REQUEST,
  STAT_SUCCESS,
  STAT_FAILURE,
  STAT_UPDATE
} from '../../constants';

const statReducer = (state, action) => {

  if (state === undefined) {
    return {
      loading: false,
      hasError: false,
      stat: {...models.stat}
    };
  }

  switch (action.type) {
    case STAT_REQUEST:
      return {
        ...state.statState,
        loading: true,
        hasError: false
      };
    case STAT_SUCCESS:
      return {
        ...state.statState,
        loading: false,
        hasError: false
      };
    case STAT_FAILURE:
      return {
        ...state.statState,
        loading: false,
        hasError: true
      };
    case STAT_UPDATE:
      return {
        ...state.statState,
        stat: { ...state.statState.stat, ...action.payload },
      };
    default:
      return state.statState;
  }
};

export default statReducer;
