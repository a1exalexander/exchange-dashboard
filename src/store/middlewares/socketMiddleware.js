import { wsConnected } from '../actions';
import { WS_CONNECT, WS_DISCONNECTED, WS_DISCONNECT } from '../../constants';
import logger from '../../services/logger';
import io from 'socket.io-client';


const socketMiddleware = () => {
  let socket = null;

  const onOpen = store => (event) => {
    logger.info('websocket open')
    store.dispatch(wsConnected());
  };

  const onClose = store => () => {
    logger.info('websocket disconected');
    store.dispatch(WS_DISCONNECTED);
  };

  return (store) => (next) => (action) => {
    switch (action.type) {
      case WS_CONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = io(action.payload);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);
        break;
      case WS_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        logger.info('websocket closed');
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
