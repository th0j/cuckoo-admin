/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Icon,
  Upload,
  Select,
  InputNumber,
  notification,
} from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import request from '../../utils/request';
import SelectBrands from './SelectBrands';

class ProductForm extends Component {
  state = {
    fileList: [],
    isEditing: false,
    selectBrands: [],
    selectCategories: [],
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      console.log(err);
      if (err) {
        return;
      } else {
        const params = new FormData();
        const { fileList } = this.state;

        fileList.forEach(file => {
          params.append('variant[image]', file);
        });

        params.append('product[brand_id]', values.brand);
        params.append('product[category_id]', values.category);
        params.append('product[name]', values.name);
        params.append('variant[price]', values.price);
        params.append('variant[cost]', values.cost);
        this._createOrUpdateProduct(params);
      }
    });
  };

  _createOrUpdateProduct = product => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    if (this.state.isEditing === false) {
      request.post(`/products`, product, config).then(res => {
        this.setState({
          fileList: [],
        });
        this.props.history.push('/products');

        notification['success']({
          message: 'Thông báo',
          description: 'Thêm sản phẩm mới thành công',
        });
      });
    } else {
      const {
        match: { params },
      } = this.props;

      request
        .put(`/products/` + params.productId, product, config)
        .then(res => {
          this.setState({
            fileList: [],
          });

          this.props.history.push('/products');
          notification['success']({
            message: 'Thông báo',
            description: 'Sửa sản phẩm thành công',
          });
        });
    }
  };

  componentDidMount() {
    const {
      match: { params },
      location: { product, isEditing },
    } = this.props;

    // Get from props
    if (_.isEmpty(product) === false) {
      this.setState({ isEditing: isEditing });
      this._fillProductData(product);
    } else if (_.isEmpty(params.productId) === false) {
      // Get from server
      this._fetchProductById(params.productId);
    }

    this._fetchBrands();
    this._fetchCategories();
  }

  _fetchProductById = productId => {
    request.get('/products/' + productId).then(res => {
      let product = res.data;
      this._fillProductData(product);
      this.setState({ isEditing: true });
    });
  };

  _fetchBrands = () => {
    request.get('/brands').then(res => {
      const Option = Select.Option;
      let selectBrands = [...this.state.selectBrands];

      res.data.forEach(v => {
        selectBrands.push(<Option key={v.id}>{v.name}</Option>);
      });
      this.setState({ selectBrands: selectBrands });
    });
  };

  _fetchCategories = () => {
    request.get('/categories').then(res => {
      const Option = Select.Option;
      let selectCategories = [...this.state.selectCategories];

      res.data.forEach(v => {
        selectCategories.push(<Option key={v.id}>{v.name}</Option>);
      });

      this.setState({
        selectCategories: selectCategories,
      });
    });
  };

  _fillProductData = product => {
    this.props.form.setFieldsValue({
      name: product.name,
      price: product.variants[0].price,
      cost: product.variants[0].cost,
    });
  };

  selectedBrandChange = value => {
    this.props.form.setfieldsvalue({
      brand: value,
    });
  };

  selectedCategoryChange = value => {
    this.props.form.setFieldsValue({
      category: value,
    });
  };

  render() {
    const { uploading, fileList } = this.state;
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
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          Tạo
        </Button>
      ) : (
        <Button
          type="primary"
          htmlType="submit"
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          Cập nhật
        </Button>
      );
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    const { getFieldDecorator } = this.props.form;
    const btnVariantList =
      this.state.isEditing === true ? (
        <Link
          to={`/products/` + this.props.match.params.productId + `/variants`}
        >
          <Button type="primary" style={{ marginBottom: '20px' }}>
            <Icon type="plus" />
            Mẫu mã
          </Button>
        </Link>
      ) : (
        ''
      );

    return (
      <div>
        {btnVariantList}
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Form.Item label="Tên sản phẩm" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
              ],
            })(<Input placeholder="Tên sản phẩm" />)}
          </Form.Item>

          <Form.Item label="Thương hiệu" {...formItemLayout}>
            {getFieldDecorator('brand', {
              rules: [
                { required: true, message: 'Vui lòng chọn thương hiệu!' },
              ],
              initialValue: this.state.selectBrands[0]
                ? this.state.selectBrands[0].key + ''
                : '',
            })(
              <Select style={{ width: 120 }}>{this.state.selectBrands}</Select>
            )}
          </Form.Item>

          <Form.Item label="Danh mục" {...formItemLayout}>
            {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Vui lòng chọn danh mục!' }],
              initialValue: this.state.selectCategories[0]
                ? this.state.selectCategories[0].key + ''
                : '',
            })(
              <Select style={{ width: 120 }}>
                {this.state.selectCategories}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Mô tả chi tiết" {...formItemLayout}>
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item label="Giá bán ra" {...formItemLayout}>
            {getFieldDecorator('price', {
              rules: [{ required: true, message: 'Vui lòng nhập giá bán ra!' }],
              initialValue: '100',
            })(<InputNumber min={1} max={10000} placeholder="Giá bán ra" />)}

            <span>.000 VND</span>
          </Form.Item>

          <Form.Item label="Giá nhập vào" {...formItemLayout}>
            {getFieldDecorator('cost', {
              rules: [{ required: true, message: 'Vui lòng nhập giá bán ra!' }],
              initialValue: '100',
            })(<InputNumber min={1} max={10000} placeholder="Giá nhập vào" />)}

            <span>.000 VND</span>
          </Form.Item>
          <Form.Item label="Upload" {...formItemLayout}>
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

const WrappedProductForm = Form.create({ name: 'product' })(ProductForm);
export default WrappedProductForm;
