import React from 'react';
import { Route } from 'react-router-dom';
import { BasicLayout } from './layouts';
import { Products } from './components';

const App = () => (
  <BasicLayout>
    <Route path="/products" component={Products} />
  </BasicLayout>
);

export default App;
