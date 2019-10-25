import {
  WS_CONNECT,
  WS_DISCONNECTED,
  WS_DISCONNECT,
  WS_ERROR,
  WS_CONNECTED,
  STAT_UPDATE
} from '../../constants';
import logger from '../../services/logger';
import { WESOCKET_ROOT } from '../../api';
import has from '../../utils/has';

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

  const onMessage = store => e => {
    const payload = JSON.parse(e.data);
    // logger.info(payload, 'WEBSOCKET MESSAGE');
    switch (payload.type) {
      case 'trade':
        store.dispatch([STAT_UPDATE, { price: payload['price'] }]);
        break;
      case 'trade_volume_XBTUSD':
        store.dispatch([
          STAT_UPDATE,
          { volume_of_last: payload['trade_volume'] }
        ]);
        break;
      case 'volume1m':
        store.dispatch([
          STAT_UPDATE,
          {
            volume1m_change: payload['volume1m_change'],
            volume1m_change_percent: payload['volume1m_change_percent']
          }
        ]);
        break;
      case 'volume5m':
        store.dispatch([
          STAT_UPDATE,
          {
            volume5m_change: payload['volume5m_change'],
            volume5m_change_percent: payload['volume5m_change_percent']
          }
        ]);
        break;
      case 'volume1h':
        store.dispatch([
          STAT_UPDATE,
          {
            volume1h_change: payload['volume1h_change'],
            volume1h_change_percent: payload['volume1h_change_percent']
          }
        ]);
        break;
      case 'volume1d':
        store.dispatch([
          STAT_UPDATE,
          {
            volume1d_change: payload['volume1d_change'],
            volume1d_change_percent: payload['volume1d_change_percent']
          }
        ]);
        break;
      case 'instrument':
        switch (true) {
          case has(payload, 'open_interest'):
            store.dispatch([
              STAT_UPDATE,
              { open_inerest: payload['open_interest'] }
            ]);
            break;
          case has(payload, 'predicted_funding_rate'):
              store.dispatch([
                STAT_UPDATE,
                { predicted_funding_rate: payload['predicted_funding_rate'] }
              ]);
              break;
          case has(payload, 'current_funding_rate'):
            store.dispatch([
              STAT_UPDATE,
              {
                current_funding_rate: payload['current_funding_rate'],
                next_funding_rate_change: payload['next_funding_rate_change']
              }
            ]);
            break;
          default:
              break;
        }
        break;
      default:
        break;
    }
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
        socket.onmessage = onMessage(store);
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
