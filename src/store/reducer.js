import { chartReducer, parametersReducer, thresholdsReducer, customLevelsReducer, statReducer, websocketReducer } from './reducers';

const reducer = (state, action) => {
  return {
    parametersModule: parametersReducer(state, action),
    customLevelsModule: customLevelsReducer(state, action),
    thresholdsModule: thresholdsReducer(state, action),
    chartModule: chartReducer(state, action),
    statModule: statReducer(state, action),
    websocketModule: websocketReducer(state, action),
  };
};

export default reducer;
