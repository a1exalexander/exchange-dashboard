import {
  PARAMETERS_REQUEST,
  PARAMETERS_SUCCESS,
  PARAMETERS_FAILURE,
  PARAMETERS_UPDATE
} from '../../constants';

const parametersReducer = (state, action) => {

  if (state === undefined) {
    return {
      loading: false,
      hasError: false,
      parameters: [],
    };
  }

  switch (action.type) {
    case PARAMETERS_REQUEST:
      return {
        ...state.parametersState,
        loading: true,
        hasError: false
      };
    case PARAMETERS_SUCCESS:
      return {
        ...state.parametersState,
        loading: false,
        hasError: false
      };
    case PARAMETERS_FAILURE:
      return {
        ...state.parametersState,
        loading: false,
        hasError: true
      };
    case PARAMETERS_UPDATE:
      return {
        ...state.parametersState,
        parameters: [...action.payload],
      };
    default:
      return state.parametersState;
  }
};

export default parametersReducer;
