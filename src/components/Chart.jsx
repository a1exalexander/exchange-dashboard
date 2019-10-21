import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import ChartComponent from "react-chartjs-2";
import 'chartjs-chart-financial';
import "chartjs-plugin-annotation";
import 'chartjs-plugin-zoom';

const Chart = ({ chart }) => {

  const [dataChart, updateDataChart] = useState({
    datasets: [{ label: "Exhcange", data: [] }]
  })

  const options = {
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
          enabled: false,
          mode: 'xy',
        },
        zoom: {
          enabled: true,
          drag: true,
          mode: 'x',
          speed: 0.1,
        }
      },
    },
    annotation: {
      annotations: [
        {
          drawTime: "afterDraw",
          borderColor: "black",
          borderWidth: 2,
          mode: "horizontal",
          type: "line",
          value: 8360,
          scaleID: "y-axis-0",
        },
        {
          drawTime: "afterDraw",
          borderColor: "green",
          borderWidth: 2,
          mode: "horizontal",
          type: "line",
          value: 7930,
          scaleID: "y-axis-0",
        }
      ]
    }
  };

  useEffect(() => {
    updateDataChart({ datasets: [ { ...dataChart.datasets[0], label: "Exhcange", data: [...chart] } ] })
  }, [chart])

  return <ChartComponent type='ohlc' data={dataChart} options={options} />;
};

export default connect(({ chartModule: { chart = [] } = {} }) => ({ chart }))(Chart);
