import React from "react";
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
import Avatar from "react-avatar-edit";

import { fileToBase64, createAvatarUrl } from "../../../utils";
import { getUser, setUserData } from "app/redux/actions/UserActions";
import profileService from "../../services/profileService";

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
      photo: "",
      photoURL: "",
      photoURLLoaded: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    profileService.getUserProfile(this.props.user).then((userProfile) => {
      userProfile.photoURL = createAvatarUrl(userProfile.photo);
      this.setState({ ...userProfile });
      this.setState({ photoURLLoaded: true });
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
    data.token = this.props.user.token;
    data.type = this.props.user.type;
    delete data.photoURL;
    delete data.photoURLLoaded;
    delete data.token;
    delete data.type;

    data.birthday = moment(data.birthday).format("YYYY-MM-DD");

    if (this.state.id) {
      profileService.updateProfile(this.state.id, data).then((user) => {
        this.props.setUserData(user);
      });
    } else {
      profileService.createProfile(data).then((user) => {
        this.props.setUserData(user);
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

  onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 716800) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  onFileLoad(file) {
    fileToBase64(file).then((fileBase64) => {
      const base64 = fileBase64.split(",")[1];
      this.setState({ photo: base64 });
    });
  }

  onFileClose() {
    this.setState({ photo: "" });
  }

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
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: 25, marginBottom: 25 }}>
                    {this.state.photoURLLoaded && (
                      <Avatar
                        width={120}
                        height={120}
                        shadingOpacity={0}
                        cropColor="transparent"
                        backgroundColor="transparent"
                        closeIconColor="#053644"
                        shadingColor="transparent"
                        onBeforeFileLoad={this.onBeforeFileLoad}
                        onFileLoad={this.onFileLoad}
                        onClose={this.OnFileClose}
                        src={this.state.photoURL}
                        label="Avatar"
                      />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div>
                      <TextValidator
                        label="Name"
                        onChange={this.handleChange}
                        type="text"
                        style={{ width: "100%" }}
                        name="name"
                        value={name}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <TextValidator
                        label="Email"
                        type="email"
                        value={email}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>

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
