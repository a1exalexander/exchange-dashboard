import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { getAnnotations } from '../store/getters';

const Chart = ({ timeframe, annotations }) => {

  const [options, updateOptions] = useState({
      "width": '100%',
      "height": 510,
      "symbol": "BITMEX:XBTUSD",
      "interval": timeframe,
      "timezone": "Etc/UTC",
      "theme": "Light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_5abd4",
  });

  const mountChart = (options) => {
    new window.TradingView.widget(options);
  }

  useEffect(() => {
    updateOptions((prevState) => ({ ...prevState, 'interval': timeframe }));
  }, [timeframe]); 

  useEffect(() => {
    mountChart(options);
  }, [options]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_5abd4"></div>
    </div>
    
  );
};

export default connect(
  (store) => ({
    levelsModule: store.levelsModule,
    chart: store.levelsModule.chart,
    annotations: getAnnotations(store),
    timeframe: store.parametersModule.timeframe,
  }),
)(Chart);
