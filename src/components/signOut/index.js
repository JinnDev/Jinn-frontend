import React from 'react';
import { withFirebase } from '../firebase';
import {Button} from 'antd';

const SignOutButton = ({ firebase }) => (
  <Button ghost type="button" onClick={firebase.doSignOut}>
      Sign Out
  </Button>
);
export default withFirebase(SignOutButton);
