import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { getAnnotations } from '../store/getters';

const Chart = ({ annotations }) => {
  
  useEffect(() => {
    const params = {
      "width": '100%',
      "height": 510,
      "symbol": "BITMEX:XBTUSD",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "Light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_5abd4",
    };
    new window.TradingView.widget(params);
  }, [])
  return (
    <div class="tradingview-widget-container">
      <div id="tradingview_5abd4"></div>
    </div>
    
  );
};

export default connect(
  (store) => ({
    levelsModule: store.levelsModule,
    chart: store.levelsModule.chart,
    annotations: getAnnotations(store),
  }),
)(Chart);
