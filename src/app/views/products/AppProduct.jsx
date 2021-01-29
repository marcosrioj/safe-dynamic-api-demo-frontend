import React from "react";
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
import Avatar from "react-avatar-edit";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Grid } from "@material-ui/core";
import { confirm } from "devextreme/ui/dialog";

import { BACKEND_URL } from "appSettings";
import {
  createDevExpressDataSource,
  createImageUrl,
  fileToBase64,
} from "utils";

const urlBase = `${BACKEND_URL}/dynamicapi/records/products`;
const fiedlsToGet = ["id", "name", "photo", "price", "stock"];
const datasource = createDevExpressDataSource(urlBase, fiedlsToGet);

function photoRender(data) {
  return <img src={`data:image/jpg;base64,${data.value}`} alt="" />;
}

class AppProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      price: "",
      stock: "",
      photo: "",
      photoURL: "",
      photoURLLoaded: false,
      popupFormVisible: false,
    };

    this.cleanState = this.cleanState.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.columnActions = this.columnActions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
    this.onFileClose = this.onFileClose.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  cleanState() {
    this.setState({
      id: "",
      name: "",
      price: "",
      stock: "",
      photo: "",
      photoURL: "",
      photoURLLoaded: false,
      popupFormVisible: false,
    });
  }

  openPopup(e, self) {
    if (e && e.data) {
      e.data.photoURL = createImageUrl(e.data.photo);
      self.setState({ ...e.data });
    } else {
      self.cleanState();
    }

    self.setState({ popupFormVisible: true });
    self.setState({ photoURLLoaded: true });
  }

  hidePopup(self) {
    this.cleanState();
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

  deleteItem(e, self) {
    let result = confirm(
      "Are you sure you want to delete this record?",
      "Delete",
      false
    );
    result.then((dialogResult) => {
      if (dialogResult) {
        self.cleanState();
        datasource._store.remove(e.data.id).then(() => {
          datasource.reload();
        });
      }
    });
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
                        className="mb-16 w-100"
                        label="Stock"
                        onChange={this.handleChange}
                        type="number"
                        name="stock"
                        value={this.state.stock}
                        validators={["required"]}
                      />
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label="Price"
                  onChange={this.handleChange}
                  type="number"
                  name="price"
                  value={this.state.price}
                  validators={["required"]}
                />
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" type="submit">
              <span className="pl-8 capitalize">Save</span>
            </Button>
          </ValidatorForm>
        </Popup>

        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Products" }]} />
        </div>
        <div className="py-12" />

        <SimpleCard>
          <div className="dx-datagrid-header-panel">
            <div className="dx-toolbar dx-widget dx-visibility-change-handler dx-collection">
              <div className="dx-toolbar-items-container">
                <div className="dx-toolbar-after">
                  <div className="dx-item dx-toolbar-item dx-toolbar-button dx-toolbar-item-auto-hide dx-toolbar-text-auto-hide">
                    <div
                      className="dx-item-content dx-toolbar-item-content"
                      onClick={() => this.openPopup(null, this)}
                    >
                      <div
                        className="dx-datagrid-toolbar-button dx-edit-button dx-datagrid-addrow-button dx-button dx-button-normal dx-button-mode-text dx-widget dx-button-has-icon dx-button-has-text"
                        aria-label="Add a row"
                        title="Add a row"
                      >
                        <div className="dx-button-content">
                          <i className="dx-icon dx-icon-edit-button-addrow"></i>
                          <span className="dx-button-text">Add a row</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
            <Column dataField="price" dataType="number" format="currency" />
            <Column dataField="stock" dataType="number" />
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

export default AppProduct;
