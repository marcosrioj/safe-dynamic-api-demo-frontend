import React, { Component } from "react";
import { Card, Grid, CircularProgress, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { loginExternal } from "../../redux/actions/LoginActions";

const styles = (theme) => ({
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

class ExternalSignin extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    if (params.has("token")) {
      this.props.loginExternal(params.get("token"));
    }
  }

  render() {
    let { loading } = this.state;

    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center flex-middle h-100">
                  <img src="/assets/images/illustrations/dreamer.svg" alt="" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100 bg-light-gray position-relative">
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={this.props.classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginExternal: PropTypes.func.isRequired,
});

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { loginExternal })(ExternalSignin))
);
