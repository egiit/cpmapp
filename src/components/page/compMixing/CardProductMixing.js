import React from 'react';
import { Card, Nav } from 'react-bootstrap';

const CardProductMixing = ({ productPlann, setProductName }) => {
  return (
    <>
      <Card className="shadow border-0">
        <Card.Header>
          <span className="fw-bold">Pilih Product</span>
        </Card.Header>
        <Card.Body>
          <Nav variant="pills" className="flex-column">
            {productPlann.map((product, index) => (
              <Nav.Item key={index} className="border rounded mt-2 shadow-sm">
                <Nav.Link
                  onClick={() => setProductName(product.PRODUCT_NAME)}
                  eventKey={product.PRODUCT_ID}
                >
                  {product.PRODUCT_NAME}
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
