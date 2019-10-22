import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import ChartComponent from "react-chartjs-2";
import 'chartjs-chart-financial';
import "chartjs-plugin-annotation";
import 'chartjs-plugin-zoom';
import { getAnnotations } from '../store/getters';

const Chart = ({ chart, annotations }) => {

  const [dataChart, updateDataChart] = useState({
    datasets: [{ label: "Exhcange", data: [] }]
  })

  const [options, updateOptions] = useState({
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          display: false
        }
      ]
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          enabled: false,
          drag: true,
          mode: 'x',
          speed: 0.1,
        }
      },
    },
    annotation: {
      annotations: []
    }
  })

  useEffect(() => {
    updateDataChart({ datasets: [ { ...dataChart.datasets[0], label: "Exhcange", data: [...chart] } ] });
    updateOptions({ ...options, annotation: { annotations }});
  }, [chart])

  useEffect(() => {
    updateOptions({ ...options, annotation: { annotations }});
  }, [annotations])

  return (
    <ChartComponent type='ohlc' data={dataChart} options={options} />
  );
};

export default connect(
  (store) => ({
    levelsModule: store.levelsModule,
    chart: store.levelsModule.chart,
    annotations: getAnnotations(store),
  }),
)(Chart);
