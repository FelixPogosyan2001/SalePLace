import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../redux/actions/user';
import App from './App';
import {AppProps} from '../additional/interfaces';
import {AppState} from '../redux/reducers/index';

const AppContainer: React.FC<AppProps> = (props) => {
  return (<App token={props.token} logout={props.logout} />);
}

export default connect((state: AppState) => ({token : state.auth.token}),{logout})(AppContainer);
