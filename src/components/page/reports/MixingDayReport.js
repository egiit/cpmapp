import React from 'react';
import { Container, Breadcrumb, Row, Col, Card, Form } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import moment from 'moment';

const MixingDayReport = () => {
  const options = {
    chart: {
      height: 380,
      width: '100%',
      type: 'rangeBar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100],
      },
    },
    yaxis: {
      show: true,
    },
    xaxis: {
      type: 'datetime',
    },
    // tooltip: {
    //   x: {
    //     show: false,
    //     format: 'HH:mm',
    //   },
    // },
  };
  const series = [
    {
      name: 'Malkist Gula',
      data: [
        {
          x: 'batch 1',
          y: [
            new Date('2020-05-14 07:25:00 GMT').getTime(),
            new Date('2020-05-14 08:10:00 GMT').getTime(),
          ],
        },
        {
          x: 'batch 2',
          y: [
            new Date('2020-05-14 08:25:00 GMT').getTime(),
            new Date('2020-05-14 08:55:00 GMT').getTime(),
          ],
        },
        {
          x: 'batch 3',
          y: [
            new Date('2020-05-14 09:00:00 GMT').getTime(),
            new Date('2020-05-14 09:30:00 GMT').getTime(),
          ],
        },
        {
          x: 'batch 4',
          y: [
            new Date('2020-05-14 09:50:00 GMT').getTime(),
            new Date('2020-05-14 10:20:00 GMT').getTime(),
          ],
        },
        {
          x: 'batch 5',
          y: [
            new Date('2020-05-14 10:35:00 GMT').getTime(),
            new Date('2020-05-14 11:05:00 GMT').getTime(),
          ],
        },
        {
          x: 'batch 6',
          y: [
            new Date('2020-05-14 11:20:00 GMT').getTime(),
            new Date('2020-05-14 11:50:00 GMT').getTime(),
          ],
        },
      ],
    },
    {
      name: 'Malkist Lemon',
      data: [
        {
          x: 'batch 7',
          y: [
            new Date('2020-05-14 13:15:00 GMT').getTime(),
            new Date('2020-05-14 13:45:00 GMT').getTime(),
          ],
        },
        {
          x: 'batch 8',
          y: [
            new Date('2020-05-14 14:00:00 GMT').getTime(),
            new Date('2020-05-14 16:00:00 GMT').getTime(),
          ],
        },
        {
          x: 'downtime',
          y: [
            new Date('2020-05-14 14:15:00 GMT').getTime(),
            new Date('2020-05-14 15:45:00 GMT').getTime(),
          ],
          fillColor: '#FF4560',
        },
        {
          x: 'batch 9',
          y: [
            new Date('2020-05-14 16:20:00 GMT').getTime(),
            new Date('2020-05-14 16:50:00 GMT').getTime(),
          ],
        },
        {
          x: 'batch 10',
          y: [
            new Date('2020-05-14 17:05:00 GMT').getTime(),
            new Date('2020-05-14 17:45:00 GMT').getTime(),
          ],
        },
        {
          x: 'batch 11',
          y: [
            new Date('2020-05-14 18:30:00 GMT').getTime(),
            new Date('2020-05-14 19:00:00 GMT').getTime(),
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Mixer</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Mixer Daily Reports
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Card className="border-0 shadow mb-3">
          <Card.Body>
            <Row>
              <Col className="mb-2" md={4}>
                <Form.Control size="sm" type="date" />
              </Col>
              <Col className="mb-2" md={4}>
                <Form.Select size="sm">
                  <option>Select Shift</option>
                </Form.Select>
              </Col>
              <Col className="mb-2" md={4}>
                <Form.Select size="sm">
                  <option>Select Product</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Chart
                  options={options}
                  series={series}
                  type="rangeBar"
                  height={450}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MixingDayReport;
