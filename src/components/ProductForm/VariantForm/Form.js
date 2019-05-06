import React from 'react';
import { Form, Select } from 'antd';

const CustomizedForm = Form.create({
  name: 'variant',

  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },

  mapPropsToFields(props) {
    console.log('=a===========================');
    console.log(props.selectOptionTypes);
    return {
      optionType: Form.createFormField({
        ...props.selectOptionTypes,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(props => {
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  return (
    <Form layout="horizontal">
      <Form.Item label="Mẫu mã" {...formItemLayout}>
        {getFieldDecorator('optionType', {
          rules: [{ required: true, message: 'Vui lòng chọn mẫu mã!' }],
          initialValue: props.selectOptionTypes[0]
            ? props.selectOptionTypes[0].key + ''
            : '',
        })(<Select style={{ width: 120 }}>{props.selectOptionTypes}</Select>)}
      </Form.Item>
    </Form>
  );
});

export default CustomizedForm;
