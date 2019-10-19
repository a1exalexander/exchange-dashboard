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
  logger.error(error);
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
  fetchThresholds = async () => {
    try {
      const { data } = await axios.get(url.thresholds);
      return data;
    } catch (e) {
      throw e;
    }
  };
  fetchChart = async () => {
    try {
      const { data } = await axios.get(url.chart);
      return data;
    } catch (e) {
      throw e;
    }
  }
}

export default HttpService;
