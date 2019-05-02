/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import { Button, Icon, Table, Tag } from 'antd';
import format from 'date-fns/format';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import request from '../../utils/request';

// import ProductForm from '../ProductForm';
// import List from './List';

// const ProductContext = createContext();

class Products extends PureComponent {
  state = {
    products: [],
    isEditing: false,
  };

  componentDidMount() {
    let data = [];
    request.get(`/products`).then(res => {
      res.data.forEach(v => {
        const product = {
          key: v.id,
          name: v.name,
          availableOn: format(new Date(), 'DD/mm/YYYY') + '',
          img: v.variants[0].image_url,

          category: 'son',
        };
        data.push(product);
      });
      this.setState({ products: data });
    });
  }

  onDelete = key => {
    request.delete(`/products/` + key).then(res => {
      if (res.status === 204) {
        let products = [...this.state.products];
        _.remove(products, product => {
          return product.key === key;
        });
        this.setState({ products: products });
      }
    });
  };

  onEdit(key) {
    request.put(`/products/` + key).then(res => {
      if (res.status === 200) {
      }
    });
  }

  render() {
    const columns = [
      {
        title: '',
        dataIndex: 'img',
        key: 'img',
        render: text => <img src={text} alt="" />,
      },
      {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Link
            to={{
              pathname: '/products/' + record.key,
              product: record,
              isEditing: true,
            }}
          >
            {text}
          </Link>
        ),
      },
      {
        title: 'Ngày bán',
        dataIndex: 'availableOn',
        key: 'availableOn',
      },
      {
        title: 'Danh mục',
        key: 'category',
        dataIndex: 'category',
        render: category => (
          <Tag color="volcano" key={category}>
            {category.toUpperCase()}
          </Tag>
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
    return (
      <div>
        <Link to="/products/new">
          <Button type="primary" style={{ marginBottom: '20px' }}>
            <Icon type="plus" />
            Thêm sản phẩm
          </Button>
        </Link>
        <Table dataSource={[...this.state.products]} columns={columns} />;
      </div>
    );
  }
}

export default Products;
