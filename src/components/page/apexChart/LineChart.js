import React from 'react';
import Chart from 'react-apexcharts'; // import { ReactApexChart } from 'apexcharts';
import { Card } from 'react-bootstrap';

const LineChart = ({ title, dataChart, categorie }) => {
  //   console.log(dataChart);
  //   console.log(categorie);
  const series = dataChart;

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
    title: {
      text: title,
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categorie,
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

export default LineChart;
