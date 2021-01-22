import React from "react";
import axios from "axios";
import moment from "moment";
import "devextreme/data/odata/store";
import "devextreme/data/odata/store";
import "whatwg-fetch";
import { Breadcrumb, SimpleCard } from "matx";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { BACKEND_URL } from "appSettings";
import { getUser, setUserData } from "app/redux/actions/UserActions";
import localStorageService from "../../services/localStorageService";

class AppProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      birthday: new Date(),
      mobile_number: "",
      genre: "",
      biography: "",
      user_id: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`${BACKEND_URL}/dynamicapi/records/clients`).then((res) => {
      if (res.data.records) {
        if (res.data.records.length === 0) {
          this.props.getUser();

          this.setState({
            name: this.props.user.name,
            email: this.props.user.email,
            user_id: this.props.user.user_id,
          });
        } else {
          const user = res.data.records[0];
          let data = {};
          for (const i in user) {
            const prop = user[i];
            if (prop) {
              data[i] = user[i];
            }
          }

          this.setState({ ...data });
        }
      } else {
        // eslint-disable-next-line no-throw-literal
        throw "Data Loading Error";
      }
    });
  }

  handleSubmit = (event) => {
    let data = {};
    for (const i in this.state) {
      const prop = this.state[i];
      if (prop) {
        data[i] = this.state[i];
      }
    }

    data.birthday = moment(data.birthday).format("YYYY-MM-DD");

    if (this.state.id) {
      axios
        .put(`${BACKEND_URL}/dynamicapi/records/clients/${this.state.id}`, data)
        .then((res) => {
          axios
            .get(`${BACKEND_URL}/dynamicapi/records/clients/${this.state.id}`)
            .then((res2) => {
              this.props.setUserData(res2.data);
              localStorageService.setItem("auth_user", res2.data);
            });
        });
    } else {
      axios
        .post(`${BACKEND_URL}/dynamicapi/records/clients`, data)
        .then((res) => {
          axios
            .get(`${BACKEND_URL}/dynamicapi/records/clients/${res.data}`)
            .then((res2) => {
              this.props.setUserData(res2.data);
              localStorageService.setItem("auth_user", res2.data);
            });
        });
    }
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBirthdayChange = (birthday) => {
    this.setState({ birthday });
  };

  render() {
    let { name, mobile_number, genre, birthday, email, biography } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Profile" }]} />
        </div>
        <div className="py-12" />

        <SimpleCard title="Profile">
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={(errors) => null}
          >
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label="Name"
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="Email"
                  type="email"
                  value={email}
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className="mb-16 w-100"
                    margin="none"
                    id="mui-pickers-date"
                    label="Birthday"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={birthday}
                    onChange={this.handleBirthdayChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label="Mobile Number"
                  onChange={this.handleChange}
                  type="text"
                  name="mobile_number"
                  value={mobile_number}
                  validators={["maxStringLength: 20"]}
                  errorMessages={["max length is 20"]}
                />
                <RadioGroup
                  className="mb-16"
                  value={genre}
                  name="genre"
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio color="secondary" />}
                    label="Male"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio color="secondary" />}
                    label="Female"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="others"
                    control={<Radio color="secondary" />}
                    label="Others"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </Grid>
              <Grid item sm={12} xs={12} style={{ paddingTop: 0 }}>
                <TextField
                  className="mb-16 w-100 pt-0"
                  label="Biography"
                  name="biography"
                  rows={4}
                  multiline={true}
                  onChange={this.handleChange}
                  value={biography}
                />
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" type="submit">
              <span className="pl-8 capitalize">Save</span>
            </Button>
          </ValidatorForm>
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getUser: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  user: state.user,
});

export default connect(mapStateToProps, { getUser, setUserData })(AppProfile);
