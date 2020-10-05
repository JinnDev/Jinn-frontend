import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
import { withAuthorization } from '../session';
import * as ROLES from '../constants/roles';

const PaidPage = () => (
  <div>Paid page</div>

);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ISPAID];

export default compose(
  withAuthorization(condition),
  withFirebase,
)(PaidPage);
