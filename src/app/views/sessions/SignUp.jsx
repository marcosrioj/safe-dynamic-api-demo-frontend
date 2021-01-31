import React, { Component } from "react";
import {
  Card,
  Checkbox,
  Grid,
  Button,
  Snackbar,
  MenuItem,
  CircularProgress,
  withStyles,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
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

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    terms: false,
    role_id: "",
    openMessage: false,
    roles: [],
    loading: false,
  };

  componentDidMount() {
    jwtAuthService.getRoles().then((roles) => {
      this.setState({ roles });
    });
  }

  handleChange = (event) => {
    event.persist();
    const value =
      event.target.name === "terms"
        ? !(event.target.value === "true" ? true : false)
        : event.target.value;

    this.setState({
      [event.target.name]: value,
    });
  };

  handleFormSubmit = (event) => {
    const data = { ...this.state };
    data.password_confirmation = data.password;
    delete data.openMessage;
    delete data.roles;
    delete data.loading;

    this.setState({ loading: true });
    jwtAuthService
      .register(data)
      .then((d) => {
        this.setState({ loading: false });
        history.push({
          pathname: "/",
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({ openMessage: true });
      });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openMessage: false });
  };

  render() {
    let { name, email, password, terms, role_id, roles, loading } = this.state;

    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <Snackbar
          open={this.state.openMessage}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity="error"
            className={this.props.classes.colorWhite}
          >
            It was not possible to register a new user. Check the fields again.
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
                      variant="outlined"
                      label="Name"
                      onChange={this.handleChange}
                      type="text"
                      name="name"
                      value={name}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid",
                      ]}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />

                    <SelectValidator
                      className="mb-16 w-100"
                      label="Role"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="role_id"
                      value={role_id}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    >
                      {roles.map((r) => (
                        <MenuItem key={r.id} value={r.id}>
                          {r.name}
                        </MenuItem>
                      ))}
                    </SelectValidator>

                    <Checkbox
                      checked={terms}
                      style={{ paddingLeft: 0 }}
                      name="terms"
                      required
                      value={terms}
                      onChange={this.handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <span style={{ fontSize: 11 }}>
                      I have read and agree to the terms of service.
                    </span>
                    <div className="flex flex-middle">
                      <div className={this.props.classes.wrapper}>
                        <Button
                          className="capitalize"
                          variant="contained"
                          color="primary"
                          disabled={loading}
                          type="submit"
                        >
                          Sign up
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
  connect(mapStateToProps, {})(SignUp)
);
