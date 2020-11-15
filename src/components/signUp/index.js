import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Layout, Row, Form, Input, Icon, Button, Col } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
import './index.css';

import { withFirebase } from '../firebase';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isPaid: '',
  error: null,
};

const SignUpPage = () => (
  <div style={{ background: '#fff', padding: 28, minHeight: '70vh'}}>
    <Row justify="center" type="flex">
      <h2>Sign Up</h2>
    </Row>
    <br/>
    <Row justify="center" type="flex">
      <SignUpForm />
    </Row>
  </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ... INITIAL_STATE }
  }

  onSubmit = event => {
  }

  onSubmit = event => {
    const { username, email, passwordOne, isPaid } = this.state;
    const roles = {};

    if(isPaid){
      roles[ROLES.ISPAID] = ROLES.ISPAID;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a new user in Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles
          });
      })
      .then(authUser => {
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

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isPaid,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

      console.log(isInvalid)

    return (
      <Form onSubmit={this.onSubmit} className="sign-up-form">
        <Input
          prefix={<UserOutlined />}
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Username"
          allowClear={true}
        />
        <br/>
        <br/>
        <Input
          prefix={<MailOutlined />}
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="E-mail"
          allowClear={true}
        />
        <br/>
        <br/>
        <Input
          prefix={<LockOutlined />}
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Enter Password"
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
          placeholder="Confirm Password"
          allowClear={true}
        />
        <br/>
        <br/>
        <Button disabled={isInvalid} onClick={this.onSubmit} type="primary" htmlType="submit" className="sign-up-form-button">
          Sign Up
        </Button>
        <br/>
        <br/>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
