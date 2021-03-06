import {
  PARAMETERS_REQUEST,
  PARAMETERS_SUCCESS,
  PARAMETERS_FAILURE,
  PARAMETERS_UPDATE
} from '../../constants';

const parametersModule = {
  loading: false,
  hasError: false,
  parameters: [],
};

const parametersReducer = (state = { parametersModule }, action) => {

  switch (action.type) {
    case PARAMETERS_REQUEST:
      return {
        ...state.parametersModule,
        loading: true,
        hasError: false
      };
    case PARAMETERS_SUCCESS:
      return {
        ...state.parametersModule,
        loading: false,
        hasError: false
      };
    case PARAMETERS_FAILURE:
      return {
        ...state.parametersModule,
        loading: false,
        hasError: true
      };
    case PARAMETERS_UPDATE:
      return {
        ...state.parametersModule,
        parameters: [...action.payload],
      };
    default:
      return state.parametersModule;
  }
};

export default parametersReducer;
