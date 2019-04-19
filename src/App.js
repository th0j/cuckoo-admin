import React from 'react';
import { Route } from 'react-router-dom';
import { BasicLayout } from './layouts';
import { Products, Product } from './components';

const App = () => (
  <BasicLayout>
    <Route path="/product" component={Product} />
    <Route path="/products" component={Products} />
  </BasicLayout>
);

export default App;
