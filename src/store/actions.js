import {
  WS_CONNECT,
  WS_CONNECTING,
  WS_CONNECTED,
  WS_DISCONNECT,
  WS_DISCONNECTED,
  CHART_UPDATE,
  CHART_REQUEST,
  CHART_SUCCESS,
  CHART_FAILURE,
  PARAMETERS_FAILURE,
  PARAMETERS_SUCCESS,
  PARAMETERS_UPDATE,
  PARAMETERS_REQUEST,
  THRESHOLDS_REQUEST,
  THRESHOLDS_SUCCESS,
  THRESHOLDS_UPDATE,
  THRESHOLDS_FAILURE
} from '../constants';
import HttpService from '../services/httpService';
import { WESOCKET_ROOT } from '../api';

const httpService = new HttpService();

export const wsConnect = () => dispatch => dispatch([WS_CONNECT, WESOCKET_ROOT]);
export const wsConnecting = () => WS_CONNECTING;
export const wsConnected = () => WS_CONNECTED;
export const wsDisconnect = () => WS_DISCONNECT;
export const wsDisconnected = () => WS_DISCONNECTED;

export const fetchParameters = () => async dispatch => {
  dispatch(PARAMETERS_REQUEST);
  try {
    const payload = await httpService.fetchParameters();
    dispatch(PARAMETERS_UPDATE, payload);
    dispatch(PARAMETERS_SUCCESS);
  } catch (e) {
    dispatch(PARAMETERS_FAILURE);
  }
};

export const fetchThresholds = () => async dispatch => {
  dispatch(THRESHOLDS_REQUEST);
  try {
    const payload = await httpService.fetchThresholds();
    dispatch(THRESHOLDS_UPDATE, payload);
    dispatch(THRESHOLDS_SUCCESS);
  } catch (e) {
    dispatch(THRESHOLDS_FAILURE);
  }
};

export const fetchChart = () => async dispatch => {
  dispatch(CHART_REQUEST);
  try {
    const payload = await httpService.fetchChart();
    dispatch([CHART_UPDATE, payload]);
    dispatch(CHART_SUCCESS);
  } catch (e) {
    dispatch(CHART_FAILURE);
  }
};
