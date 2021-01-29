import React from "react";
import moment from "moment";
import "devextreme/data/odata/store";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Paging,
  Pager,
  FilterRow,
  Position,
  Sorting,
} from "devextreme-react/data-grid";
import { Popup } from "devextreme-react/popup";
import "whatwg-fetch";
import { Breadcrumb, SimpleCard } from "matx";
import {
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Avatar from "react-avatar-edit";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { confirm } from "devextreme/ui/dialog";

import { BACKEND_URL } from "appSettings";
import {
  createDevExpressDataSource,
  createAvatarUrl,
  fileToBase64,
} from "utils";

const urlBase = `${BACKEND_URL}/dynamicapi/records/clients`;
const fiedlsToGet = [
  "id",
  "name",
  "email",
  "photo",
  "mobile_number",
  "is_active",
  "genre",
  "biography",
  "birthday",
];
const datasource = createDevExpressDataSource(urlBase, fiedlsToGet);

function photoRender(data) {
  return <img src={`data:image/jpg;base64,${data.value}`} alt="" />;
}

class AppClient extends React.Component {
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
      photo: "",
      photoURL: "",
      photoURLLoaded: false,
      popupFormVisible: false,
    };

    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
  }

  cleanState() {
    this.setState({
      id: "",
      name: "",
      email: "",
      birthday: new Date(),
      mobile_number: "",
      genre: "",
      biography: "",
      photo: "",
      photoURL: "",
      popupFormVisible: false,
    });
  }

  openPopup(e, self) {
    self.setState({ popupFormVisible: true });
    e.data.photoURL = createAvatarUrl(e.data.photo);
    self.setState({ ...e.data });
    self.setState({ photoURLLoaded: true });
  }

  hidePopup(self) {
    this.cleanState();
  }

  deleteItem(e, self) {
    let result = confirm("Are you sure you want to delete this record?", 'Delete', false);
    result.then((dialogResult) => {
      if (dialogResult) {
        self.cleanState();
        datasource._store.remove(e.data.id).then(() => {
          datasource.reload();
        });
      }
    });
  }

  columnActions(e, self) {
    return (
      <>
        <span
          className="dx-link dx-link-edit dx-icon-edit dx-link-icon"
          title="Edit"
          aria-label="Edit"
          onClick={() => self.openPopup(e, self)}
        ></span>
        &nbsp;
        <span
          className="dx-link dx-link-delete dx-icon-trash dx-link-icon"
          title="Delete"
          aria-label="Delete"
          onClick={() => self.deleteItem(e, self)}
        ></span>
      </>
    );
  }

  handleSubmit = (event) => {
    let data = {};
    for (const i in this.state) {
      data[i] = this.state[i];
    }

    delete data.photoURL;
    delete data.photoURLLoaded;
    delete data.popupFormVisible;

    data.birthday = moment(data.birthday).format("YYYY-MM-DD");

    if (this.state.id) {
      datasource._store.update(this.state.id, data).then(() => {
        this.cleanState();
        datasource.reload();
      });
    } else {
      datasource._store.insert(data).then(() => {
        this.cleanState();
        datasource.reload();
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

  onFileLoad(file, self) {
    fileToBase64(file).then((fileBase64) => {
      const base64 = fileBase64.split(",")[1];
      self.setState({ photo: base64 });
    });
  }

  onFileClose(self) {
    self.setState({ photo: "" });
    self.setState({ photoURL: "" });
  }

  render() {
    return (
      <div className="m-sm-30">
        <Popup
          title="Client"
          showTitle={true}
          width={700}
          height={525}
          visible={this.state.popupFormVisible}
          onHiding={() => this.hidePopup(this)}
        >
          <Position my="top" at="top" of={window} />

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
                        imageWidth={120}
                        shadingOpacity={0}
                        cropColor="transparent"
                        backgroundColor="transparent"
                        closeIconColor="#053644"
                        shadingColor="transparent"
                        onBeforeFileLoad={this.onBeforeFileLoad}
                        onFileLoad={(f) => this.onFileLoad(f, this)}
                        onClose={() => this.onFileClose(this)}
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
                        value={this.state.name}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <TextValidator
                        label="Email"
                        type="email"
                        value={this.state.email}
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
                    value={this.state.birthday}
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
                  value={this.state.mobile_number}
                  validators={["maxStringLength: 20"]}
                  errorMessages={["max length is 20"]}
                />
                <RadioGroup
                  className="mb-16"
                  value={this.state.genre}
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
                  value={this.state.biography}
                />
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" type="submit">
              <span className="pl-8 capitalize">Save</span>
            </Button>
          </ValidatorForm>
        </Popup>

        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Clients" }]} />
        </div>
        <div className="py-12" />
        <SimpleCard>
          <DataGrid
            dataSource={datasource}
            showBorders={true}
            remoteOperations={true}
          >
            <Sorting mode="multiple" />
            <FilterRow visible={true} applyFilter={true} />

            <Column dataField="id" dataType="number" width={75} />
            <Column
              dataField="photo"
              width={100}
              allowSorting={false}
              allowFiltering={false}
              cellRender={photoRender}
            />
            <Column dataField="name" dataType="string" />
            <Column dataField="email" dataType="string" />
            <Column dataField="mobile_number" dataType="string" />
            <Column dataField="genre" dataType="string" />
            <Column dataField="is_active" dataType="string" visible={false} />
            <Column dataField="biography" dataType="string" visible={false} />
            <Column dataField="birthday" dataType="date" visible={false} />
            <Column
              cellRender={(e) => this.columnActions(e, this)}
              width={75}
            />

            <Paging defaultPageSize={5} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />
          </DataGrid>
        </SimpleCard>
      </div>
    );
  }
}

export default AppClient;
