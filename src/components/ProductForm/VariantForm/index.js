import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Icon,
  Select,
  InputNumber,
  Upload,
  notification,
} from 'antd';

import request from '../../../utils/request';

class VariantForm extends Component {
  state = {
    selectOptionTypes: [],
    selectOptionValues: [],
    optionTypes: [],
    fileList: [],
    isEditing: false,
  };
  componentDidMount() {
    this._fetchOptionTypes();
  }

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
          params.append('image', file);
        });

        params.append('name', values.name);
        params.append('price', values.price);
        params.append('cost', values.cost);
        params.append('option_value_id', values.optionValue);
        this._createOrUpdateProduct(params);
      }
    });
  };

  _createOrUpdateProduct = variant => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const {
      match: { params },
    } = this.props;

    if (this.state.isEditing === false) {
      request
        .post(`/products/` + params.productId + `/variants`, variant, config)
        .then(res => {
          this.setState({
            fileList: [],
          });
          this.props.history.push(
            `/products/` + params.productId + `/variants`
          );

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
        .put(`/products/` + params.productId + `/variants`, variant, config)
        .then(res => {
          this.setState({
            fileList: [],
          });

          this.props.history.push(
            `/products/` + params.productId + `/variants`
          );
          notification['success']({
            message: 'Thông báo',
            description: 'Sửa sản phẩm thành công',
          });
        });
    }
  };

  handleSelectedChange = value => {
    console.log('changed' + value);
  };

  _fetchOptionTypes = () => {
    request.get('/option_types').then(res => {
      const Option = Select.Option;
      let selectOptionTypes = [...this.state.selectOptionTypes];
      let selectOptionValues = [...this.state.selectOptionValues];
      let optionTypes = [...this.state.optionTypes];

      res.data.forEach(t => {
        selectOptionTypes.push(<Option key={t.id}>{t.presentation}</Option>);
        optionTypes.push(t);
        t.option_values.forEach(v => {
          selectOptionValues.push(<Option key={v.id}>{v.presentation}</Option>);
        });
      });

      this.setState({
        selectOptionTypes: selectOptionTypes,
        selectOptionValues: selectOptionValues,
        optionTypes: optionTypes,
      });
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    const { fileList } = this.state;
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
    const { getFieldDecorator } = this.props.form;
    const action =
      this.state.isEditing === false ? (
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          Tạo
        </Button>
      ) : (
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          Cập nhật
        </Button>
      );

    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        {/* <Form.Item label="Mẫu mã" {...formItemLayout}>
          {getFieldDecorator('optionType', {
            rules: [{ required: true, message: 'Vui lòng chọn mẫu mã!' }],
            initialValue: this.state.selectOptionTypes[0]
              ? this.state.selectOptionTypes[0].key + ''
              : '',
          })(
            <Select style={{ width: 120 }} onChange={this.handleSelectedChange}>
              {this.state.selectOptionTypes}
            </Select>
          )}
        </Form.Item> */}
        <Form.Item label="Màu sắc" {...formItemLayout}>
          {getFieldDecorator('optionValue', {
            rules: [{ required: true, message: 'Vui lòng chọn màu sắc!' }],
            initialValue: this.state.selectOptionValues[0]
              ? this.state.selectOptionValues[0].key + ''
              : '',
          })(
            <Select style={{ width: 120 }}>
              {this.state.selectOptionValues}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Tên mẫu mã" {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Vui lòng chọn màu sắc!' }],
            initialValue: '',
          })(<Input placeholder="Name" />)}
        </Form.Item>

        <Form.Item label="SKU" {...formItemLayout}>
          {getFieldDecorator('sku', {
            rules: [{ required: true, message: 'Vui lòng chọn màu sắc!' }],
            initialValue: this.state.selectOptionValues[0]
              ? this.state.selectOptionValues[0].key + ''
              : '',
          })(<Input placeholder="SKU" />)}
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
    );
  }
}

const WrappedVariantForm = Form.create({
  name: 'variant',
})(VariantForm);
export default WrappedVariantForm;
