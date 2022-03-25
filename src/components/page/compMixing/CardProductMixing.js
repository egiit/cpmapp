import React, { useContext } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { MixingContex } from '../provider/Mixing.provider';

const CardProductMixing = ({ setProductName }) => {
  const { mixerData } = useContext(MixingContex);

  return (
    <>
      <Card className="shadow border-0">
        <Card.Header>
          <span className="fw-bold">Pilih Product</span>
        </Card.Header>
        <Card.Body>
          <Nav variant="pills" className="flex-column">
            {mixerData.map((product, index) => (
              <Nav.Item key={index} className="border rounded mt-2 shadow-sm">
                <Nav.Link
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setProductName(product.product_name, product.product_id)
                  }
                  eventKey={product.product_id}
                >
                  {product.product_name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardProductMixing;
