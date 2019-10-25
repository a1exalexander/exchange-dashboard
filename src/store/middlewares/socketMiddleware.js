import {
  WS_CONNECT,
  WS_DISCONNECTED,
  WS_DISCONNECT,
  WS_ERROR,
  WS_CONNECTED,
} from '../../constants';
import logger from '../../services/logger';
import { WESOCKET_ROOT } from '../../api';
import socketMessages from '../../services/socketMessages';

const socketMiddleware = () => {
  let socket = null;
  let originalSend = null;

  const onOpen = store => e => {
    logger.info({ type: e.type, url: e.target.url }, 'WEBSOCKET OPEN');
    store.dispatch(WS_CONNECTED);
  };

  const onClose = store => e => {
    logger.info({ type: e.type, url: e.target.url }, 'WEBSOCKET DISCONECTED');
    store.dispatch(WS_DISCONNECTED);
  };

  const onError = store => e => {
    logger.info({ type: e.type, url: e.target.url }, 'WEBSOCKET ERROR');
    store.dispatch(WS_ERROR);
  };

  const onSend = (...args) => {
    logger.info(args, 'WEBSOCKET SEND');
    return originalSend.apply(socket, args);
  };

  return store => next => action => {
    switch (action.type) {
      case WS_CONNECT:
        if (socket !== null) {
          socket.close();
        }
        logger.info(WESOCKET_ROOT, 'WEBSOCKET CONNECTION');
        socket = new WebSocket(action.payload);
        originalSend = socket.send;
        socket.onopen = onOpen(store);
        socket.send = onSend;
        socket.onclose = onClose(store);
        socket.onerror = onError(store);
        socket.onmessage = socketMessages(store);
        break;

      case WS_CONNECTED:
        socket.send(
          JSON.stringify({
            subscribe: 'XBTUSD'
          })
        );
        socket.send(
          JSON.stringify({
            subscribe: 'trade_volume_XBTUSD'
          })
        );
        socket.send(
          JSON.stringify({
            subscribe: 'volume1m_XBTUSD'
          })
        );
        socket.send(
          JSON.stringify({
            subscribe: 'volume5m_XBTUSD'
          })
        );
        socket.send(
          JSON.stringify({
            subscribe: 'volume1h_XBTUSD'
          })
        );
        socket.send(
          JSON.stringify({
            subscribe: 'volume1d_XBTUSD'
          })
        );
        socket.send(
          JSON.stringify({
            subscribe: 'instrument_XBTUSD'
          })
        );
        break;

      case WS_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        originalSend = null;
        logger.info('', 'WEBSOCKET CLOSED');
        break;

      case WS_ERROR:
        if (socket !== null) {
          socket.close();
        }
        break;

      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
