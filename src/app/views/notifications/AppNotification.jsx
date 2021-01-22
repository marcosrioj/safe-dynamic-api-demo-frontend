import React from "react";
import moment from "moment";
import "devextreme/data/odata/store";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Paging,
  Pager,
  FilterRow,
  Editing,
  Popup,
  Position,
  Form,
  Sorting,
} from "devextreme-react/data-grid";
import { Item } from "devextreme-react/form";
import "whatwg-fetch";
import { Breadcrumb, SimpleCard } from "matx";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { BACKEND_URL } from "appSettings";
import { createDevExpressStore } from "utils";
import { setNotificationTotalCount } from "app/redux/actions/NotificationActions";

const urlBase = `${BACKEND_URL}/dynamicapi/records/notifications`;
const fiedlsToGet = ["id", "type", "title", "message", "timestamp"];
const store = createDevExpressStore(urlBase, fiedlsToGet);
class AppNotification extends React.Component {
  constructor(props) {
    super(props);

    store.on("loaded", (e) => {
      this.props.setNotificationTotalCount(e.totalCount);
    });
  }

  render() {
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Notifications" }]} />
        </div>
        <div className="py-12" />
        <SimpleCard>
          <DataGrid
            dataSource={store}
            showBorders={true}
            remoteOperations={true}
            onRowInserting={(e) => {
              e.data.timestamp = moment(
                e.data.timestamp,
                "DD/MM/YYYY HH:mm:ss"
              ).format("YYYY-MM-DD HH:mm:ss");
            }}
          >
            <Sorting mode="multiple" />
            <FilterRow visible={true} applyFilter={true} />

            <Editing
              mode="popup"
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true}
            >
              <Popup
                title="Notification"
                showTitle={true}
                width={700}
                height={325}
              >
                <Position my="top" at="top" of={window} />
              </Popup>
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item
                    dataField="type"
                    dataType="string"
                    editorType="dxSelectBox"
                    editorOptions={{
                      items: ["alert", "message"],
                      value: "",
                    }}
                    validationRules={[
                      { type: "required", message: "Type is required." },
                    ]}
                  />
                  <Item
                    dataField="timestamp"
                    dataType="datetime"
                    validationRules={[
                      { type: "required", message: "Timestamp is required." },
                    ]}
                  />
                  <Item
                    dataField="title"
                    dataType="string"
                    validationRules={[
                      { type: "required", message: "Title is required." },
                    ]}
                  />
                  <Item
                    dataField="message"
                    dataType="string"
                    validationRules={[
                      { type: "required", message: "Message is required." },
                    ]}
                  />
                </Item>
              </Form>
            </Editing>

            <Column dataField="id" dataType="number" width={75} />
            <Column dataField="type" dataType="string" />
            <Column dataField="title" dataType="string" />
            <Column
              dataField="timestamp"
              dataType="datetime"
              customizeText={(e) => new Date(e.value).toLocaleString()}
            />
            <Column dataField="message" dataType="string" visible={false} />
            <Paging defaultPageSize={5} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />
          </DataGrid>
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  setNotificationTotalCount: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { setNotificationTotalCount })(
  AppNotification
);
