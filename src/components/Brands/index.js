import React, { Component } from 'react';
import { Button, Icon, Table } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import request from '../../utils/request';

// import BrandForm from '../BrandForm';
// import { BrandContext } from './BrandContext';
// import BrandProvider, { BrandConsumer } from './BrandProvider';

class Brands extends Component {
  state = {
    brands: [],
    visible: false,
  };

  columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link
          to={{
            pathname: '/brands/' + record.key,
            brand: record,
            isEditing: true,
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="danger" onClick={() => this.onDelete(record.key)}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  componentDidMount() {
    let data = [];
    request.get(`/brands`).then(res => {
      res.data.forEach((v, i) => {
        const brand = {
          key: v.id,
          name: v.name,
        };
        data.push(brand);
      });
      this.setState({ brands: data });
    });
  }

  onDelete(key) {
    request.delete(`/brands/` + key).then(res => {
      if (res.status === 204) {
        let brands = [...this.state.brands];
        _.remove(brands, product => {
          return product.key === key;
        });
        this.setState({ brands: brands });
      }
    });
  }

  render() {
    return (
      <div>
        <Link to="/brands/new">
          <Button type="primary" style={{ marginBottom: '20px' }}>
            <Icon type="plus" />
            Thêm
          </Button>
        </Link>
        <Table
          dataSource={[...this.state.brands]}
          columns={this.columns}
        />{' '}
      </div>
    );
  }
}

export default Brands;
