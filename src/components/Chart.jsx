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
      yAxes: [{
        type: 'financialLinear'
      }],
      xAxes: [
        {
          display: true,
          stacked: true,
          beginAtZero: true,
          type: "time",
          time: {
            unit: "day",
            displayFormats: {
              day: "DD/MM/YYYY"
            }
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 4.1,
          }
        }
      ]
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          enabled: false,
          drag: true,
          mode: 'xy',
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
    // eslint-disable-next-line
  }, [chart])

  useEffect(() => {
    updateOptions(prevState => ({ ...prevState, annotation: { annotations }}));
  }, [annotations])

  return (
    <ChartComponent width={102} height={50} type='candlestick' data={dataChart} options={options} />
  );
};

export default connect(
  (store) => ({
    levelsModule: store.levelsModule,
    chart: store.levelsModule.chart,
    annotations: getAnnotations(store),
  }),
)(Chart);
