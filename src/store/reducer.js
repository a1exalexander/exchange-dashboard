import { levelsReducer, parametersReducer, thresholdsReducer, statReducer, websocketReducer } from './modules';

const reducer = (state, action) => {
  return {
    levelsModule: levelsReducer(state, action),
    parametersModule: parametersReducer(state, action),
    thresholdsModule: thresholdsReducer(state, action),
    statModule: statReducer(state, action),
    websocketModule: websocketReducer(state, action),
  };
};

export default reducer;
