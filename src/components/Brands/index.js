import React, { Component } from 'react';
import { Button, Icon, Modal, Table, Tag } from 'antd';
import request from '../../utils/request';

class Brands extends Component {
  state = {
    brands: [],
  };

  columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
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
      res.data.data.forEach((v, i) => {
        const brand = {
          key: v.attributes.id,
          name: v.attributes.name,
        };
        data.push(brand);
      });
      this.setState({ brands: data });
    });
  }

  onDelete(key) {}

  render() {
    return (
      <div>
        <Button type="primary" style={{ marginBottom: '20px' }}>
          <Icon type="plus" />
          Thêm
        </Button>
        {console.log(this.state.brands)}
        <Table dataSource={[...this.state.brands]} columns={this.columns} />
      </div>
    );
  }
}

export default Brands;
