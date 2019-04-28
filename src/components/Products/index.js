/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import { Button, Icon, Table, Tag } from 'antd';
import axios from 'axios';
import format from 'date-fns/format';
import _ from 'lodash';
import { Link } from 'react-router-dom';

// import ProductForm from '../ProductForm';
// import List from './List';

// https://upload.lixibox.com/system/pictures/files/000/039/367/small/1552296373
// small: 148 x 100
// medium: 310 x 210
// large: 844 x 572

// const ProductContext = createContext();

class Products extends PureComponent {
  state = {
    products: [],
    isEditing: false,
  };

  componentDidMount() {
    let data = [];
    axios.get(`http://localhost:3000/api/admin/products`).then(res => {
      res.data.data.forEach((v, i) => {
        const product = {
          key: v.attributes.id,
          name: v.attributes.name,
          availableOn: format(new Date(), 'DD/mm/YYYY') + '',
          img: v.attributes.images[0],
          category: 'son',
        };
        data.push(product);
      });
      this.setState({ products: data });
    });
  }

  onDelete = key => {
    axios
      .delete(`http://localhost:3000/api/admin/products/` + key)
      .then(res => {
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
    axios.put(`http://localhost:3000/api/admin/products/` + key).then(res => {
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
