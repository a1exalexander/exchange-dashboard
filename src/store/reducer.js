import { chartReducer, parametersReducer, thresholdsReducer } from './reducers';

const reducer = (state, action) => {
  return {
    parametersState: parametersReducer(state, action),
    thresholdsState: thresholdsReducer(state, action),
    chartState: chartReducer(state, action),
  };
};

export default reducer;
