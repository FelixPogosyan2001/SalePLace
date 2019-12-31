import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../redux/actions/user';
import App from './App';

const AppContainer = (props) => {
  return (<App token={props.token} logout={props.logout} />);
}

export default connect((state) => ({token : state.auth.token}),{logout})(AppContainer);
