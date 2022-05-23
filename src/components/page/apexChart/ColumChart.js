import React, { useContext } from 'react';
import Chart from 'react-apexcharts'; // import { ReactApexChart } from 'apexcharts';
import { Card } from 'react-bootstrap';
import { DashboardContex } from '../provider/Dashboard.provider';

const ColumChart = () => {
  const { state } = useContext(DashboardContex);

  const series = [
    {
      name: 'Batch Time',
      data: state.dataChartBatch,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
      },
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Batch Time', 'Target Time'],
      markers: {
        fillColors: ['#00E396', '#E0000B'],
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

export default ColumChart;
