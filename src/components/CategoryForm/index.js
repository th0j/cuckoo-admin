import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import _ from 'lodash';
import request from '../../utils/request';

class CategoryForm extends Component {
  state = {
    isEditing: false,
    category: {
      key: '',
      name: '',
    },
  };

  changeHandler = ({ target: { value, name } }) => {
    let category = { ...this.state.category };
    category.name = value;

    this.setState({ category: category });
  };

  createHandler = () => {
    request.post('/categories', this.state.category).then(res => {
      this.props.history.push('/categories');
    });
  };

  editHandler = () => {
    console.log('editing');
    const { category } = this.state;
    const {
      match: { params },
    } = this.props;

    request.put(`/categories/` + params.categoryId, category).then(res => {
      let category = res.data;
      this.setState({ category: { name: category.name } });

      this.props.history.push('/categories');
    });
  };

  componentDidMount() {
    const {
      match: { params },
      location: { category, isEditing },
    } = this.props;

    // Get from props
    if (_.isEmpty(category) === false) {
      this.setState({ category: category, isEditing: isEditing });
    } else if (_.isEmpty(params.categoryId) === false) {
      // Get from server
      request.get('/categories/' + params.categoryId).then(res => {
        let category = res.data;
        this.setState({ category: { name: category.name } });
      });
    }
  }

  handleOnSubmit = e => {
    e.preventDefault();
    const updatedCategory = { ...this.state.category };
    this.props.updateAccount(updatedCategory);
  };

  render() {
    const category = { ...this.state.category };
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
              placeholder="Tên danh muc"
              value={category.name}
              onChange={this.changeHandler}
            />
          </Form.Item>
          {action}
        </Form>
      </div>
    );
  }
}

export default CategoryForm;
