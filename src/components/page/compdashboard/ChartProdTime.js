import React, { useContext } from 'react';
import Chart from 'react-apexcharts'; // import { ReactApexChart } from 'apexcharts';
import { Card } from 'react-bootstrap';
import { DashboardContex } from '../provider/Dashboard.provider';

const ChartProdTime = () => {
  const { state } = useContext(DashboardContex);

  const series = !state.dataChartProdTime.series
    ? []
    : state.dataChartProdTime.series;
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: !state.dataChartProdTime.categories
        ? []
        : state.dataChartProdTime.categories,
    },
    yaxis: {
      title: {
        text: 'Total Time (HOUR)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' HOUR';
        },
      },
    },
  };

  return (
    <>
      <Card className="shadow border-0 ">
        <Card.Body className="p-1 p-sm-1">
          <Chart options={options} series={series} type="bar" height={350} />
        </Card.Body>
      </Card>
    </>
  );
};

export default ChartProdTime;
