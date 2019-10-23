import url from "../api";
import axios from "axios";
import logger, { getErrorMessage } from "./logger";

axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  const logName = `[URL: ${response.config.url}, STATUS: ${response.status}]`;
  if (response.status === 200) {
    logger.info(response.data, logName);
  } else {
    logger.log(response.data, logName);
  }
  return response;
}, (error) => {
  const logName = `[URL: ${error.response.config.url}, STATUS: ${error.response.status}]`;
  logger.error(error, logName);
  return Promise.reject(getErrorMessage(error));
});

class HttpService {
  fetchParameters = async () => {
    try {
      const { data } = await axios.get(url.parameters);
      return data;
    } catch (e) {
      throw e;
    }
  };
  fetchParametersUpdate = async (payload) => {
    try {
      await axios.put(`${url.parameters}/${payload.id}/`, payload);
      return;
    } catch (e) {
      return;
    }
  };
  fetchFunding = async () => {
    try {
      const { data } = await axios.get(url.funding);
      return data;
    } catch (e) {
      throw e;
    }
  };
  fetchThresholds = async () => {
    try {
      const { data } = await axios.get(url.thresholds);
      return data;
    } catch (e) {
      throw e;
    }
  };
  thresholdsAlertsUpdate = async (payload) => {
    try {
      await axios.put(`${url.thresholds}/${payload.id}/`, payload);
      return;
    } catch (e) {
      return;
    }
  };
  fetchLevels = async (params) => {
    try {
      const { data } = await axios.post(url.levels, params);
      return data;
    } catch (e) {
      throw e;
    }
  };
  getLevels = async () => {
    try {
      const { data } = await axios.get(url.levels);
      return data;
    } catch (e) {
      throw e;
    }
  };
  addLevel = async (params) => {
    try {
      const res = await axios.put(url.levels, params);
      if (res.status !== 200) throw res.data;
      return;
    } catch (e) {
      throw e;
    }
  };
  deleteLevel = async (params) => {
    try {
      const res = await axios.delete(url.levels, { data: params});
      if (res.status !== 200) throw res.data;
      return;
    } catch (e) {
      throw e;
    }
  }
}

export default HttpService;
