import React, { useContext } from 'react';
import Chart from 'react-apexcharts'; // import { ReactApexChart } from 'apexcharts';
import { Card } from 'react-bootstrap';
import { DashboardContex } from '../provider/Dashboard.provider';

const ChartDashboard = () => {
  const { state } = useContext(DashboardContex);

  const series = state.dataChartFG.series ? state.dataChartFG.series : [];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'straight',
    },
    // colors: ['#b9fc00', '#E91E63', '#9C27B0'],
    title: {
      text: 'Finish Good by Hour',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: state.dataChartFG.categories
        ? state.dataChartFG.categories
        : [],
    },
  };

  return (
    <>
      <Card className="shadow border-0 ">
        <Card.Body className="p-1 p-sm-1">
          <Chart options={options} series={series} type="line" height={350} />
        </Card.Body>
      </Card>
    </>
  );
};

export default ChartDashboard;
