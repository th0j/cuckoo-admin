import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BasicLayout } from './layouts';
import { Products, ProductForm } from './components';

const App = () => (
  <BasicLayout>
    <Switch>
      <Route path="/products" exact component={Products} />
      <Route path="/products/new" exact component={ProductForm} />
      <Route path="/products/:productId" component={ProductForm} />
    </Switch>
  </BasicLayout>
);

export default App;
