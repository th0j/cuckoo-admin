/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Tag } from 'antd';

class List extends Component {
  render() {
    // const { ...tableProps } = this.props;
    console.log('===================');
    console.log(this.props);
    console.log('===================');
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
        render: text => (
          <a href="#" onClick={this.showModal}>
            {text}
          </a>
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
            {/* {category.toUpperCase()} */}
            {category}
          </Tag>
        ),
      },
      {
        title: '',
        key: 'action',
        render: (text, record) =>
          // <span>
          //   <Button type="danger" onClick={() => onDelete(record.key)}>
          //     Xóa
          //   </Button>
          // </span>
          'hihi',
      },
    ];

    // return <Table {...tableProps} columns={columns} />;
    return <div>hihi</div>;
  }
}

export default List;
