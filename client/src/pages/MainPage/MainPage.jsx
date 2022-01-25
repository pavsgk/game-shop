import OrderingComponent from '../../components/OrderingComponent/OrderingComponent';
import React from 'react';

function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>

      <OrderingComponent
        text={'Standart'}
        details={'normally 4-5 business days, unless otherwise noted'}
        price={'$7.95'}
      />
    </div>
  );
}

export default MainPage;
