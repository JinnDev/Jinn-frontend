import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../signOut';
import {Layout, Menu, Radio, Col, Row, Select, Button} from 'antd';
import 'antd/dist/antd.css';

import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

import { AuthUserContext } from '../session';

import GetPremium from '../getPremium';


const {Header} = Layout;

const Navigation = () => (
  <Header>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </Header>
);


const NavigationAuth = ({ authUser }) => (
  <Menu theme="dark" mode="horizontal" style={{lineHeight: '61px'}}>
    <Menu.Item key="1">
      <Link to={ROUTES.LANDING}>
        <img alt="logo" src="logo192.png" height="37px"/>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to={ROUTES.LANDING}><b>Landing</b></Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to={ROUTES.HOME}><b>Home</b></Link>
    </Menu.Item>
    <Menu.Item key="4">
      <Link to={ROUTES.ACCOUNT}><b>Account</b></Link>
    </Menu.Item>
    {/* Will have to change the rules here for the get premium,
        just testing that it works at the moment */}
    {!authUser.roles[ROLES.ISPAID] == "ISPAID" && (
      <Menu.Item key="5">
        <GetPremium user={authUser}/>
      </Menu.Item>
    )}
    {!!authUser.roles[ROLES.ISPAID] == "ISPAID" && (
      <Menu.Item key="6" >
        <Link to={ROUTES.PAID}><b>Paid Page</b></Link>
      </Menu.Item>
    )}
    <Menu.Item key="4" style={{float: 'right'}}>
        <SignOutButton/>
    </Menu.Item>
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu theme="dark" mode="horizontal" style={{lineHeight: '61px'}}>
    <Menu.Item key="1">
      <Link to={ROUTES.LANDING}>
        <img alt="logo" src="logo192.png" height="37px"/>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to={ROUTES.LANDING}><b>Landing</b></Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to={ROUTES.SIGN_IN}><b>Sign In</b></Link>
    </Menu.Item>
  </Menu>
);

export default Navigation;
