import {
  WS_CONNECTED,
  WS_DISCONNECTED
} from '../../constants';

const websocketReducer = (state, action) => {

  if (state === undefined) {
    return {
      connected: false,
    };
  }

  switch (action.type) {
    case WS_CONNECTED:
      return {
        ...state.websocketModule,
        connected: true,
      };
    case WS_DISCONNECTED:
      return {
        ...state.websocketModule,
        connected: false,
      };
    default:
      return state.websocketModule;
  }
};

export default websocketReducer;
