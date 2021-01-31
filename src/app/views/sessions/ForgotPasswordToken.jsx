import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  Snackbar,
  CircularProgress,
  withStyles,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";

import jwtAuthService from "app/services/jwtAuthService";
import history from "history.js";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const styles = (theme) => ({
  wrapper: {
    position: "relative",
  },

  colorWhite: {
    color: "#fff !important",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

class ForgotPasswordToken extends Component {
  state = {
    email: "",
    token: "",
    password: "",
    loading: false,
    openMessageSuccess: false,
    openMessageError: false,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    this.setState({ email: params.get("email"), token: params.get("token") });
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    const data = { ...this.state };
    data.password_confirmation = data.password;
    delete data.openMessageError;
    delete data.openMessageSuccess;
    delete data.loading;

    this.setState({ loading: true });
    jwtAuthService
      .forgotPasswordToken(data)
      .then((d) => {
        this.setState({ loading: false, openMessageSuccess: true });
      })
      .catch((err) => {
        this.setState({ loading: false, openMessageError: true });
      });
  };

  handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openMessageSuccess: false });

    history.push({
      pathname: "/session/signin",
    });
  };

  handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openMessageError: false });
  };

  render() {
    let { password, loading } = this.state;

    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <Snackbar
          open={this.state.openMessageSuccess}
          autoHideDuration={6000}
          onClose={this.handleCloseSuccess}
        >
          <Alert
            onClose={this.handleCloseSuccess}
            severity="success"
            className={this.props.classes.colorWhite}
          >
            Password successfully reset! Log in with the new password.
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.openMessageError}
          autoHideDuration={6000}
          onClose={this.handleCloseError}
        >
          <Alert
            onClose={this.handleCloseError}
            severity="error"
            className={this.props.classes.colorWhite}
          >
            The given data was invalid.
          </Alert>
        </Snackbar>
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-24 w-100"
                      label="New password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />

                    <div className="flex flex-middle">
                      <div className={this.props.classes.wrapper}>
                        <Button
                          className="capitalize"
                          variant="contained"
                          color="primary"
                          disabled={loading}
                          type="submit"
                        >
                          Reset Password
                        </Button>
                        {loading && (
                          <CircularProgress
                            size={24}
                            className={this.props.classes.buttonProgress}
                          />
                        )}
                        <span className="ml-16 mr-8">or</span>
                        <Button
                          className="capitalize"
                          onClick={() =>
                            this.props.history.push("/session/signin")
                          }
                        >
                          Sign in
                        </Button>
                      </div>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, {})(ForgotPasswordToken)
);
