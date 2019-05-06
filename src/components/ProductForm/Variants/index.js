/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Button, Table, Icon } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import request from '../../../utils/request';

class Variants extends Component {
  state = {
    variants: [],
    isEditing: false,
  };

  componentDidMount() {
    const {
      match: { params },
      location: { product },
    } = this.props;

    this._fetchProductById(params.productId);
  }

  _fetchProductById = productId => {
    request.get('/products/' + productId).then(res => {
      let variants = res.data.variants;
      this.setState({ variants: variants });
    });
  };

  onDelete = id => {
    const {
      match: { params },
    } = this.props;

    request
      .delete(`/products/` + params.productId + `/variants/` + id)
      .then(res => {
        if (res.status === 204) {
          let variants = [...this.state.variants];
          _.remove(variants, variant => {
            return variant.id === id;
          });
          this.setState({ variants: variants });
        }
      });
  };

  render() {
    const btnDelete =
      this.state.variants.length > 1
        ? record => (
            <span>
              <Button type="danger" onClick={() => this.onDelete(record.id)}>
                Xóa
              </Button>
            </span>
          )
        : '';
    const columns = [
      {
        title: 'Tên mẫu mã',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Link
            to={{
              pathname: '/products/' + record.key,
              variant: record,
              isEditing: true,
            }}
          >
            {text}
          </Link>
        ),
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'image_url',
        key: 'image_url',
        render: text => <img src={text} alt="" />,
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="danger" onClick={() => this.onDelete(record.id)}>
              Xóa
            </Button>
          </span>
        ),
      },
    ];

    const {
      match: { params },
      location: { product },
    } = this.props;

    return (
      <div>
        <Link to={`/products/` + params.productId + `/variants/new`}>
          <Button type="primary" style={{ marginBottom: '20px' }}>
            <Icon type="plus" />
            Thêm mẫu mã
          </Button>
        </Link>
        <Table
          dataSource={[...this.state.variants]}
          columns={columns}
          rowKey="id"
        />
      </div>
    );
  }
}

export default Variants;
