import { STAT_UPDATE } from '../constants';
import has from '../utils/has';
import logger from './logger';

export default (store) => (e) => {
  const payload = JSON.parse(e.data);
  logger.info(payload, 'WEBSOCKET MESSAGE');
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
              {
                next_funding_rate_change: payload['next_funding_rate_change'],
                predicted_funding_rate: payload['predicted_funding_rate']
              }
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
