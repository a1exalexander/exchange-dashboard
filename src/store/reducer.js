import { chartReducer, parametersReducer, thresholdsReducer, customLevelsReducer } from './reducers';

const reducer = (state, action) => {
  return {
    parametersModule: parametersReducer(state, action),
    customLevelsModule: customLevelsReducer(state, action),
    thresholdsModule: thresholdsReducer(state, action),
    chartModule: chartReducer(state, action),
  };
};

export default reducer;
