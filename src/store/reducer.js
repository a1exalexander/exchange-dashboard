import { chartReducer, parametersReducer, thresholdsReducer, customLevelsReducer, statReducer, websocketReducer } from './reducers';

const reducer = (state, action) => {
  return {
    chartModule: chartReducer(state, action),
    parametersModule: parametersReducer(state, action),
    customLevelsModule: customLevelsReducer(state, action),
    thresholdsModule: thresholdsReducer(state, action),
    statModule: statReducer(state, action),
    websocketModule: websocketReducer(state, action),
  };
};

export default reducer;
