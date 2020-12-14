import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Modal, Form, Input, Radio, InputNumber } from 'antd';

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 12,
  },
};

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Set Weight"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          {...formItemLayout}
          name="weight"
          rules={[
            {
              required: true,
              message: 'Please input a weight!',
            },
          ]}
        >

          <InputNumber
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};


class WeightModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      setVisible: false
    }
  }

  onCreate = ( values ) => {
    console.log(values["weight"]);
    this.props.onSubmit(this.props.ticker, values["weight"] / 100)
    this.setVisible(false);
  }

  setVisible = (value) => {
    this.setState({visible: value})
  }

  render(){
    const {visible, setVisible} = this.state;

    return(
      <div>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            this.setVisible(true);
          }}
        >
          Modify
        </Button>
        <CollectionCreateForm
          visible={visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setVisible(false);
          }}
        />
      </div>
    )
  }




}



// <Input />
export default WeightModal;
