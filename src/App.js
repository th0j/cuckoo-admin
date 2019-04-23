import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BasicLayout } from './layouts';
import { Products, ProductForm, Brands } from './components';

const App = () => (
  <BasicLayout>
    <Switch>
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/new" component={ProductForm} />
      <Route path="/products/:productId" component={ProductForm} />
      <Route exact path="/brands" component={Brands} />
    </Switch>
  </BasicLayout>
);

export default App;
