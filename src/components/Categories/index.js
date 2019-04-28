import React, { Component } from 'react';
import { Button, Icon, Table } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import request from '../../utils/request';

class Categories extends Component {
  state = {
    categories: [],
  };

  columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link
          to={{
            pathname: '/categories/' + record.key,
            category: record,
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
    request.get(`/categories`).then(res => {
      res.data.data.forEach((v, i) => {
        const category = {
          key: v.attributes.id,
          name: v.attributes.name,
        };
        data.push(category);
      });
      this.setState({ categories: data });
    });
  }

  onDelete(key) {
    request.delete(`/categories/` + key).then(res => {
      if (res.status === 204) {
        let categories = [...this.state.categories];
        _.remove(categories, product => {
          return product.key === key;
        });
        this.setState({ categories: categories });
      }
    });
  }

  render() {
    return (
      <div>
        <Link to="/categories/new">
          <Button type="primary" style={{ marginBottom: '20px' }}>
            <Icon type="plus" />
            Thêm
          </Button>
        </Link>
        <Table dataSource={[...this.state.categories]} columns={this.columns} />
      </div>
    );
  }
}

export default Categories;
