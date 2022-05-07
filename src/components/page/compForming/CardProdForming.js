import React, { useContext } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { FormingContex } from '../provider/Forming.provider';

const CardProdForming = ({ setProductName }) => {
  const { prodForming } = useContext(FormingContex);

  return (
    <>
      <Card className="shadow border-0">
        <Card.Header>
          <span className="fw-bold">Pilih Product</span>
        </Card.Header>
        <Card.Body>
          <Nav variant="pills" className="flex-column">
            {prodForming.map((product, index) => (
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

export default CardProdForming;
