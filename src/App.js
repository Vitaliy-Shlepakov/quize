import {Route, Switch, withRouter } from 'react-router-dom';
import React, {Component} from 'react';

import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quize/Quiz";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import { connect } from "react-redux";
import LogOut from "./components/LogOut/LogOut";
import {autoLogin} from "./store/actions/auth";

class App extends Component{

  componentDidMount() {
    const { autoLogin } = this.props;
    autoLogin();
  }

  render() {
    const { isAuthenticated } = this.props;

    const routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/" component={QuizList}/>
      </Switch>
    );

    const routesForAuthenticated = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/logout" component={LogOut}/>
        <Route path="/" component={QuizList}/>
      </Switch>
    );

    return (
      <Layout>
        { isAuthenticated
          ? routesForAuthenticated
          : routes
        }
      </Layout>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
