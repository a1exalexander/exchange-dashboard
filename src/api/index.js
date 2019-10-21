import logger from '../services/logger';

const apiType = {
  prod: 'http://0.0.0.0:5000',
  test: 'http://083ef843.ngrok.io',
};

const socketType = {
  prod: 'ws://0.0.0.0:5000/ws/ticks/',
  test: 'ws://083ef843.ngrok.io/ws/ticks/',
};

const API_MODE = process.env.REACT_APP_API;
const ROOT_URL = apiType[API_MODE];
const WESOCKET_ROOT = socketType[API_MODE];

logger.info(process.env.NODE_ENV, 'ENV');
logger.info(API_MODE, 'MODE');
logger.info(ROOT_URL, 'API URL');
logger.info(WESOCKET_ROOT, 'WEBSOCKET URL');

const url = {
  parameters: `${ROOT_URL}/bitmex/parameters`,
  thresholds: `${ROOT_URL}/bitmex/thresholds`,
  funding: `${ROOT_URL}/bitmex/funding`,
  chart: `${ROOT_URL}/`,
}

export { WESOCKET_ROOT };

export default url;

