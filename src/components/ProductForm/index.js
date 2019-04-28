import React, { Component } from 'react';
import { Form, Input, Button, Icon, Upload } from 'antd';

import _ from 'lodash';
import axios from 'axios';

class ProductForm extends Component {
  state = {
    fileList: [],
    uploading: false,
    isEditing: false,
    product: {
      id: '',
      name: '',
      description: '',
      price: 0,
    },
  };

  createHandler = file => {
    const { fileList, product } = this.state;

    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('images[]', file);
    });
    formData.append('brand_id', 2);
    formData.append('category_id', 1);
    formData.append('name', product.name);

    this.setState({
      uploading: true,
    });

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post(`http://localhost:3000/api/admin/products`, formData, config)
      .then(res => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        this.props.history.push('/products');
      });
  };

  editHandler = file => {
    const { fileList, product } = this.state;
    const {
      match: { params },
    } = this.props;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('images[]', file);
    });
    formData.append('brand_id', 2);
    formData.append('category_id', 1);
    formData.append('name', product.name);

    this.setState({
      uploading: true,
    });

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .put(
        `http://localhost:3000/api/admin/products/` + params.productId,
        formData,
        config
      )
      .then(res => {
        this.setState({
          fileList: [],
          uploading: false,
        });

        this.props.history.push('/products');
      });
  };

  changeHandler = event => {
    let product = { ...this.state.product };
    product.name = event.target.value;
    this.setState({ product: product });
  };

  componentDidMount() {
    const {
      match: { params },
      location: { product, isEditing },
    } = this.props;

    // Get from props
    if (_.isEmpty(product) === false) {
      this.setState({ product: product, isEditing: isEditing });
    } else if (_.isEmpty(params.productId) === false) {
      // Get from server
      axios
        .get('http://localhost:3000/api/admin/products/' + params.productId)
        .then(res => {
          let product = res.data.data.attributes;
          this.setState({ product: { name: product.name } });
        });
    }
  }

  render() {
    const { uploading, fileList, product } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    const action =
      this.state.isEditing === false ? (
        <Button
          type="primary"
          onClick={this.createHandler}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Đang tạo...' : 'Tạo'}
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={this.editHandler}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Đang cập nhật...' : 'Cập nhật'}
        </Button>
      );

    return (
      <div>
        <Form>
          <Form.Item>
            <Input
              placeholder="Tên sản phẩm"
              value={product.name}
              onChange={this.changeHandler}
            />
          </Form.Item>
          <Form.Item lable="description">
            <Input
              placeholder="Description"
              value={product.description}
              onChange={this.changeHandler}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Price"
              value={product.price}
              onChange={this.changeHandler}
            />
          </Form.Item>
          <Form.Item label="Upload">
            {' '}
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Chọn hình ảnh...
              </Button>
            </Upload>
            {action}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ProductForm;
