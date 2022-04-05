import React, { useContext } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { FormingContex } from '../provider/Forming.provider';

const FormingTabsContent = () => {
  const { prodForming } = useContext(FormingContex);
  // const dataProd = value.prodForming;

  return (
    <div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {prodForming.map((product, idx) => (
          <Tab
            key={idx}
            eventKey={product.product_id}
            title={product.product_name}
          >
            {product.product_name}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default FormingTabsContent;
