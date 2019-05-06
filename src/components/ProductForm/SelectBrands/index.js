/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Select } from 'antd';
import request from '../../../utils/request';

class SelectBrands extends Component {
  state = {
    brands: [],
  };

  handleChange = value => {
    console.log('===============');
  };

  componentDidMount() {
    let data = [];
    request.get('/brands').then(res => {
      console.log(res);
      res.data.forEach(v => {
        const brand = {
          id: v.id,
          name: v.name,
        };
        data.push(brand);
        console.log(brand);
        this.setState({ brands: data });
      });
    });
    console.log(this.state.brands);
  }

  render() {
    const Option = Select.Option;
    return (
      <Select style={{ width: 120 }} onChange={this.handleChange}>
        {this.state.brands.forEach(v => {
          <Option value={v.id}>{v.name}</Option>;
        })}
      </Select>
    );
  }
}

export default SelectBrands;
