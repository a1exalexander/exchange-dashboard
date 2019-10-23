import {
  WS_CONNECT,
  WS_CONNECTING,
  WS_CONNECTED,
  WS_DISCONNECT,
  WS_DISCONNECTED,
  PARAMETERS_FAILURE,
  PARAMETERS_SUCCESS,
  PARAMETERS_UPDATE,
  PARAMETERS_REQUEST,
  THRESHOLDS_REQUEST,
  THRESHOLDS_SUCCESS,
  THRESHOLDS_UPDATE,
  THRESHOLDS_FAILURE,
  STAT_UPDATE,
  STAT_REQUEST,
  STAT_SUCCESS,
  STAT_FAILURE,
  THRESHOLDS_UPDATE_ALERT,
  LEVELS_REQUEST,
  LEVELS_UPDATE,
  LEVELS_SUCCESS,
  LEVELS_FAILURE
} from '../constants';
import HttpService from '../services/httpService';
import { WESOCKET_ROOT } from '../api';
import logger from '../services/logger';
import levelParams from '../models/levelParams';

const httpService = new HttpService();

export const wsConnect = () => dispatch =>
  dispatch([WS_CONNECT, WESOCKET_ROOT]);
export const wsConnecting = () => WS_CONNECTING;
export const wsConnected = () => ({ type: WS_CONNECTED });
export const wsDisconnect = () => WS_DISCONNECT;
export const wsDisconnected = () => WS_DISCONNECTED;

export const fetchParameters = () => async dispatch => {
  dispatch(PARAMETERS_REQUEST);
  try {
    const payload = await httpService.fetchParameters();
    payload.forEach(({ key, value }) => {
      dispatch([STAT_UPDATE, { [key]: value }]);
    });
    dispatch([PARAMETERS_UPDATE, payload]);
    dispatch(PARAMETERS_SUCCESS);
  } catch (e) {
    dispatch(PARAMETERS_FAILURE);
  }
};

export const fetchParametersUpdate = type => async (dispatch, getState) => {
  let value = getState().statModule.stat[type];
  const parameter = getState().parametersModule.parameters.find(
    ({ key }) => key === type
  );

  if (parameter) {
    const payload = { ...parameter, value };
    await httpService.fetchParametersUpdate(payload);
    fetchParameters()(dispatch);
  }
};

export const parametersUpdate = (value, key) => async dispatch => {
  dispatch([STAT_UPDATE, { [key]: value }]);
};

export const fetchFunding = () => async dispatch => {
  dispatch(STAT_REQUEST);
  try {
    const payload = await httpService.fetchFunding();
    dispatch([STAT_UPDATE, payload]);
    dispatch(STAT_SUCCESS);
  } catch (e) {
    dispatch(STAT_FAILURE);
  }
};

export const fetchThresholds = () => async dispatch => {
  dispatch(THRESHOLDS_REQUEST);
  try {
    const payload = await httpService.fetchThresholds();
    payload.forEach(
      ({ timeframe, threshold_value_percent: value, threshold_type }) => {
        switch (threshold_type) {
          case 'VOLUME_CHANGE':
            switch (timeframe) {
              case '1m':
                dispatch([THRESHOLDS_UPDATE_ALERT, { volume_1m: value }]);
                break;
              case '5m':
                dispatch([THRESHOLDS_UPDATE_ALERT, { volume_5m: value }]);
                break;
              case '1h':
                dispatch([THRESHOLDS_UPDATE_ALERT, { volume_1h: value }]);
                break;
              case '1d':
                dispatch([THRESHOLDS_UPDATE_ALERT, { volume_1d: value }]);
                break;
              default:
                break;
            }
            break;
          case 'RESISTANCE':
            dispatch([THRESHOLDS_UPDATE_ALERT, { resistance: value }]);
            break;
          case 'SUPPORT':
            dispatch([THRESHOLDS_UPDATE_ALERT, { support: value }]);
            break;
          default:
            break;
        }
      }
    );
    dispatch([THRESHOLDS_UPDATE, payload]);
    dispatch(THRESHOLDS_SUCCESS);
  } catch (e) {
    dispatch(THRESHOLDS_FAILURE);
  }
};

export const fetchLevels = (params = {}) => async dispatch => {
  const formData = { ...levelParams, ...params };
  dispatch(LEVELS_REQUEST);
  try {
    const {
      candles = [],
      support = [],
      resistance = [],
      custom = [],
    } = await httpService.fetchLevels(formData);
    const chart = candles.map(x => {
      return {
        t: x.Timestamp,
        o: x.Open,
        h: x.High,
        l: x.Low,
        c: x.Close
      };
    });
    const mapLevel = (price, idx) => ({
      idx,
      price,
      chartLine: true,
      distance: ''
    });
    const supportCopy = support.map(mapLevel);
    const customCopy = custom.map(mapLevel);
    const resistanceCopy = resistance.map(mapLevel);
    dispatch([
      LEVELS_UPDATE,
      {
        chart,
        support: supportCopy,
        resistance: resistanceCopy,
        custom: customCopy
      }
    ]);
    dispatch(LEVELS_SUCCESS);
  } catch (e) {
    dispatch(LEVELS_FAILURE);
  }
};

export const removeLevel = (idx, type) => async (dispatch, getState) => {
  const shallowCopy = [...getState().levelsModule[type]];
  shallowCopy.splice(idx, 1);
  dispatch([LEVELS_UPDATE, { [type]: shallowCopy }]);
};

export const toggleChartLine = (idx, type) => (dispatch, getState) => {
  const shallowCopy = [...getState().levelsModule[type]];
  const level = { ...shallowCopy[idx] };
  shallowCopy.splice(idx, 1, { ...level, chartLine: !level.chartLine });
  dispatch([LEVELS_UPDATE, { [type]: shallowCopy }]);
};

export const toggleResistanceLine = idx => async (dispatch, getState) => {
  toggleChartLine(idx, 'resistance')(dispatch, getState);
};

export const toggleSupportLine = idx => async (dispatch, getState) => {
  toggleChartLine(idx, 'support')(dispatch, getState);
};

export const customLevelAdd = level => async (dispatch, getState) => {
  dispatch(LEVELS_REQUEST);
  const formData = { price_level: level.price, type: 'CUSTOM' };
  const shallowCustom = [...getState().levelsModule.custom, level];
  const custom = shallowCustom.map((item, idx) => ({ ...item, idx }));
  try {
    await httpService.addLevel(formData);
    dispatch([LEVELS_UPDATE, { custom }]);
    dispatch(LEVELS_SUCCESS);
    return 1;
  } catch (e) {
    dispatch(LEVELS_FAILURE);
    return 0;
  }
};

export const customLevelRemove = level => async (dispatch, getState) => {
  dispatch(LEVELS_REQUEST);
  const formData = { price_level: level.price, type: 'CUSTOM' };
  const custom = getState().levelsModule.custom.filter(
    ({ idx }) => idx !== level.idx
  );
  try {
    await httpService.deleteLevel(formData);
    dispatch([LEVELS_UPDATE, custom]);
    dispatch(LEVELS_SUCCESS);
  } catch (e) {
    dispatch(LEVELS_FAILURE);
  }
};

export const thresholdsUpdateAlert = (item, type) => async dispatch => {
  if (typeof item === 'object') {
    dispatch([THRESHOLDS_UPDATE_ALERT, { [item.type]: item.value }]);
  } else {
    dispatch([THRESHOLDS_UPDATE_ALERT, { [type]: item }]);
  }
};

export const thresholdsUpdateAlertRequest = (type, period) => async (
  dispatch,
  getState
) => {
  let threshold_value_percent = getState().thresholdsModule[type];
  let threshold;
  if (period) {
    threshold = getState().thresholdsModule.thresholds.find(
      ({ timeframe }) => timeframe === period
    );
  } else {
    threshold = getState().thresholdsModule.thresholds.find(
      ({ threshold_type }) => threshold_type === String(type).toUpperCase()
    );
  }

  if (threshold) {
    const payload = { ...threshold, threshold_value_percent };
    await httpService.thresholdsAlertsUpdate(payload);
    fetchThresholds()(dispatch);
  }
};

export const fetchData = () => dispatch => {
  fetchParameters()(dispatch);
  fetchFunding()(dispatch);
  fetchThresholds()(dispatch);
  fetchLevels()(dispatch);
};

export const changeTrades = trades => async dispatch => {
  dispatch([STAT_UPDATE, { trades }]);
};
