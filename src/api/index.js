const apiType = {
  prod: 'http://6cc0645e.ngrok.io',
  test: 'http://6cc0645e.ngrok.io',
};

const WESOCKET_ROOT = 'wss://echo.websocket.org';

const ROOT_URL = apiType[process.env.REACT_APP_API];

const url = {
  parameters: `${ROOT_URL}/bitmex/parameters`,
  thresholds: `${ROOT_URL}/bitmex/thresholds`,
  chart: `${ROOT_URL}/bitmex/chart`,
}

export { WESOCKET_ROOT };

export default url;

