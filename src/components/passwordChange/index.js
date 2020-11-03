import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import { Layout, Row, Form, Input, Icon, Button, Col, message } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
import './index.css';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        message.success('Sucessfully changed password');
      })
      .catch(error => {
        this.setState({ error });
        message.error('Failed to change password');
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
    return (
      <div style={{ background: '#fff', padding: 28, minHeight: '70vh'}}>
        <Row justify="center" type="flex">
          <h2>Change Password</h2>
        </Row>
        <br/>
        <Row justify="center" type="flex">
          <Form onSubmit={this.onSubmit} className="login-form">
            <Input
              prefix={<LockOutlined />}
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Enter New Password"
              allowClear={true}
            />
            <br/>
            <br/>
            <Input
              prefix={<LockOutlined />}
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm New Password"
              allowClear={true}
            />
            <br/>
            <br/>
            <Button disabled={isInvalid} onClick={this.onSubmit} type="primary" htmlType="submit" className="login-form-button">
              Change Password
            </Button>
            <br/>
            <br/>
            {error && <p>{error.message}</p>}
          </Form>
        </Row>
      </div>
    );
  }
}

// <form onSubmit={this.onSubmit}>
//   <input
//     name="passwordOne"
//     value={passwordOne}
//     onChange={this.onChange}
//     type="password"
//     placeholder="New Password"
//   />
//   <input
//     name="passwordTwo"
//     value={passwordTwo}
//     onChange={this.onChange}
//     type="password"
//     placeholder="Confirm New Password"
//   />
//   <button disabled={isInvalid} type="submit">
//     Reset My Password
//   </button>
//   {error && <p>{error.message}</p>}
// </form>


export default withFirebase(PasswordChangeForm);
