import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BasicLayout } from './layouts';
import {
  Products,
  ProductForm,
  Brands,
  BrandForm,
  Categories,
  CategoryForm,
} from './components';

const App = () => (
  <BasicLayout>
    <Switch>
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/new" component={ProductForm} />
      <Route path="/products/:productId" component={ProductForm} />
      <Route exact path="/brands" component={Brands} />
      <Route exact path="/brands/new" component={BrandForm} />
      <Route path="/brands/:brandId" component={BrandForm} />

      <Route exact path="/categories" component={Categories} />
      <Route exact path="/categories/new" component={CategoryForm} />
      <Route path="/categories/:categoryId" component={CategoryForm} />
    </Switch>
  </BasicLayout>
);

export default App;
