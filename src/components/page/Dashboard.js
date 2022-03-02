import React from 'react';
import { Container, Row } from 'react-bootstrap';

import CardDashboard from './compdashboard/CardDashboard';
import ChartDashboard from './compdashboard/ChartDashboard';
import DetailProcess from './compdashboard/DetailProcess';
import HeaderDashboard from './compdashboard/HeaderDashboard';
// import { AuthContext } from '../../App';

const Dashboard = () => {
  // const { username } = React.useContext(AuthContext);
  return (
    <main>
      <Container fluid className="px-4">
        <HeaderDashboard />
        <Row className="mt-3">
          {/* {username} */}
          <CardDashboard />
          <ChartDashboard />
        </Row>
        <DetailProcess />
      </Container>
    </main>
  );
};

export default Dashboard;
