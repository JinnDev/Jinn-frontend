import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Layout, Breadcrumb } from 'antd';

import Navigation from '../navigation';
import LandingPage from '../landing';
import SignUpPage from '../signUp';
import SignInPage from '../signIn';
import PasswordForgetPage from '../passwordForget';
import HomePage from '../home';
import AccountPage from '../account';
import PaidPage from '../paidPage';
import SubscriptionSuccess from '../getPremium/subscriptionSuccess.js';

import { withAuthentication } from '../session';

import * as ROUTES from '../constants/routes';

const { Footer, Content } = Layout;

const App = () => (
  <Router>
    <Layout className="layout" style={{ minHeight: "100vh"}}>
      <Navigation />
      <Content style={{ padding: '0 24px' }}>
        <Breadcrumb style={{ margin: '24px 0' }}></Breadcrumb>
        <Layout style={{  background: '#fff'}}>
          <Content style={{ minHeight: "80vh",  padding: '24px 24px' }}>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.PAID} component={PaidPage} />
            <Route path={ROUTES.SUBSCRIPTION_SUCCESS} component={SubscriptionSuccess} />
          </Content>
        </Layout>
      </Content>
      {footer}
    </Layout>
  </Router>
);

const footer = (
  <Footer style={{ textAlign: 'center' }}>
    Made with &#x2665; in Frankfurt
  </Footer>
)

export default withAuthentication(App);
