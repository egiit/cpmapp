import React from 'react';
import Chart from 'react-apexcharts'; // import { ReactApexChart } from 'apexcharts';
import { Col, Card } from 'react-bootstrap';

const ChartDashboard = () => {
  const series = [
    {
      name: 'Malkitis Lemon',
      data: [65, 59, 80, 81, 56, 55, 45, 65, 85, 83, 80, 85, 65, 87],
      id: 1,
    },
    {
      name: 'Malkitis Gula',
      data: [null, null, null, 87, 55, 65, 67, 85, 83, 80, 85, 65, 87],
      id: 2,
    },
  ];

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
      categories: [
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
      ],
    },
  };

  return (
    <>
      <Col md={12} xl={6}>
        <Card className="shadow border-0 ">
          <Card.Body className="p-1 p-sm-1">
            <Chart options={options} series={series} type="line" height={350} />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default ChartDashboard;
