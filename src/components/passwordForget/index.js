import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../firebase';
import * as ROUTES from '../constants/routes';
import { Layout, Row, Form, Input, Icon, Button, Col, message } from 'antd';
import {
  MailOutlined
} from '@ant-design/icons';
import './index.css';

const PasswordForgetPage = () => (
  <div style={{ background: '#fff', padding: 28, minHeight: '70vh'}}>
    <Row justify="center" type="flex">
      <h2>Password Forget</h2>
    </Row>
    <br/>
    <Row justify="center" type="flex">
      <PasswordForgetForm />
    </Row>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
    .doPasswordReset(email)
    .then(() => {
      this.setState({ ...INITIAL_STATE });
    })
    .catch(error => {
      this.setState({ error });
    });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <Form onSubmit={this.onSubmit} className="password-forget-form">
        <Input
          prefix={<MailOutlined />}
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Enter Email Address"
          allowClear={true}
        />
        <br/>
        <br/>
        <Button disabled={isInvalid} onClick={this.onSubmit} type="primary" htmlType="submit" className="password-forget-form-button">
          Reset My Password
        </Button>
        <br/>
        <br/>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };
