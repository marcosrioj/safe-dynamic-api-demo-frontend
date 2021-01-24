import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "app/appContext";
import { axiosConfig } from "utils";
import localStorageService from "app/services/localStorageService";

class AuthGuard extends Component {
  constructor(props, context) {
    super(props);
    let { routes } = context;

    this.state = {
      authenticated: false,
      routes,
    };

    axiosConfig();
  }

  componentDidMount() {
    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  componentDidUpdate() {
    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.authenticated !== this.state.authenticated;
  }

  static getDerivedStateFromProps(props, state) {
    let { location, user } = props;

    if (!user || (user && !user.user_id)) {
      const userLs = localStorageService.getItem("auth_user");
      const token = localStorage.getItem("jwt_token");
      if (token && user) {
        user = userLs;
      }
    }

    const { pathname } = location;
    const matched = state.routes.find((r) => r.path === pathname);
    const authenticated =
      matched && matched.auth && matched.auth.length
        ? matched.auth.includes(user.type)
        : true;

    return {
      authenticated,
    };
  }

  redirectRoute(props) {
    const { location, history } = props;
    const { pathname } = location;

    history.push({
      pathname: "/session/signin",
      state: { redirectUrl: pathname },
    });
  }

  render() {
    let { children } = this.props;
    const { authenticated } = this.state;
    return authenticated ? <Fragment>{children}</Fragment> : null;
  }
}

AuthGuard.contextType = AppContext;

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
