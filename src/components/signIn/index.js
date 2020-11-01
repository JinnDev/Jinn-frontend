import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../signUp';
import { PasswordForgetLink } from '../passwordForget';
import { withFirebase } from '../firebase';
import { Layout, Row, Form, Input, Icon, Button, Col } from 'antd';

import * as ROUTES from '../constants/routes';
import './index.css';

import {
  MailOutlined,
  LockOutlined
} from '@ant-design/icons';

const { Content } = Layout;

const SignInPage = () =>(
  <div style={{ background: '#fff', padding: 28, minHeight: '70vh'}}>
    <Row justify="center" type="flex">
      <h2>Sign in</h2>
    </Row>
    <br/>
    <Row justify="center" type="flex">
      <SignInForm />
    </Row>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <Form onSubmit={this.onSubmit} className="login-form">
        <Input
          prefix={<MailOutlined />}
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Enter E-mail"
          allowClear={true}
        />
        <br/>
        <br/>
        <Input
          prefix={<LockOutlined />}
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Enter password"
          allowClear={true}
        />
        <br/>
        <br/>
        <a className="login-form-forgot" href="">
         <u><PasswordForgetLink /></u>

        </a>
        <Button disable={isInvalid} onClick={this.onSubmit} type="primary" htmlType="submit" className="login-form-button">
          Sign in
        </Button>
        <br/>
        <br/>
        <u><SignUpLink /></u>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };
