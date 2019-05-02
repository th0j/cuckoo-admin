import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import _ from 'lodash';
import request from '../../utils/request';

class BrandForm extends Component {
  state = {
    isEditing: false,
    brand: {
      key: '',
      name: '',
    },
  };

  changeHandler = ({ target: { value, name } }) => {
    let brand = { ...this.state.brand };
    brand.name = value;

    this.setState({ brand: brand });
  };

  createHandler = () => {
    request.post('/brands', this.state.brand).then(res => {
      this.props.history.push('/brands');
    });
  };

  editHandler = () => {
    console.log('editing');

    const { brand } = this.state;

    const {
      match: { params },
    } = this.props;

    request.put(`/brands/` + params.brandId, brand).then(res => {
      let brand = res.data;
      this.setState({ brand: { name: brand.name } });

      this.props.history.push('/brands');
    });
  };

  componentDidMount() {
    const {
      match: { params },
      location: { brand, isEditing },
    } = this.props;

    // Get from props
    if (_.isEmpty(brand) === false) {
      this.setState({ brand: brand, isEditing: isEditing });
    } else if (_.isEmpty(params.brandId) === false) {
      // Get from server
      request.get('/brand/' + params.brandId).then(res => {
        let brand = res.data;
        this.setState({ brand: { name: brand.name } });
      });
    }
  }

  handleOnSubmit = e => {
    e.preventDefault();
    const updatedBrand = { ...this.state.brand };
    this.props.updateAccount(updatedBrand);
  };

  render() {
    const brand = { ...this.state.brand };
    const action =
      this.state.isEditing === false ? (
        <Button
          type="primary"
          onClick={this.createHandler}
          style={{ marginTop: 16 }}
        >
          Tạo
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={this.editHandler}
          style={{ marginTop: 16 }}
        >
          Cập nhật
        </Button>
      );
    return (
      <div>
        <Form>
          <Form.Item>
            <Input
              placeholder="Tên brand"
              value={brand.name}
              onChange={this.changeHandler}
            />
          </Form.Item>
          {action}
        </Form>
      </div>
    );
  }
}

export default BrandForm;
