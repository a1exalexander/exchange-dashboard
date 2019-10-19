import {
  CHART_REQUEST,
  CHART_SUCCESS,
  CHART_FAILURE,
  CHART_UPDATE
} from '../../constants';

const chartReducer = (state, action) => {

  if (state === undefined) {
    return {
      loading: false,
      hasError: false,
      chart: []
    };
  }

  switch (action.type) {
    case CHART_REQUEST:
      return {
        ...state.chartState,
        loading: true,
        hasError: false
      };
    case CHART_SUCCESS:
      return {
        ...state.chartState,
        loading: false,
        hasError: false
      };
    case CHART_FAILURE:
      return {
        ...state.chartState,
        loading: false,
        hasError: true
      };
    case CHART_UPDATE:
      return {
        ...state.chartState,
        chart: [...action.payload],
      };
    default:
      return state.chart;
  }
};

export default chartReducer;
