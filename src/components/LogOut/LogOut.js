import React, {Component} from 'react';
import './LogOut.sass';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {logOut} from "../../store/actions/auth";

class LogOut extends Component {

  componentDidMount() {
    const { logout } = this.props;
    logout()
  }

  render() {
    return (
      <Redirect to={"/"}/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logOut())
  }
};

export default connect(null, mapDispatchToProps)(LogOut);
