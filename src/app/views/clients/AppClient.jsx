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

import { BACKEND_URL } from "appSettings";
import { createDevExpressStore } from "utils";

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
const store = createDevExpressStore(urlBase, fiedlsToGet);

function photoRender(data) {
  return <img src={`data:image/jpg;base64,${data.value}`} alt="" />;
}

class AppClient extends React.Component {
  render() {
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Clients" }]} />
        </div>
        <div className="py-12" />
        <SimpleCard>
          <DataGrid
            dataSource={store}
            showBorders={true}
            remoteOperations={true}
          >
            <Sorting mode="multiple" />
            <FilterRow visible={true} applyFilter={true} />

            <Editing
              mode="popup"
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true}
              onRowInserting={(e) => {
                e.data.birthday = moment(e.data.birthday, "DD/MM/YYYY").format(
                  "YYYY-MM-DD"
                );
              }}
            >
              <Popup title="Client" showTitle={true} width={700} height={525}>
                <Position my="top" at="top" of={window} />
              </Popup>
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item
                    dataField="name"
                    dataType="string"
                    validationRules={[
                      { type: "required", message: "Genre is required." },
                    ]}
                  />
                  <Item dataField="email" dataType="string" />
                  <Item dataField="mobile_number" dataType="string" />
                  <Item dataField="birthday" dataType="date" />
                  <Item
                    dataField="genre"
                    editorType="dxSelectBox"
                    editorOptions={{
                      items: ["male", "female", "others"],
                      value: "",
                    }}
                  />
                  <Item
                    dataField="is_active"
                    dataType="string"
                    editorType="dxSelectBox"
                    editorOptions={{
                      items: [true, false],
                      value: true,
                    }}
                  />
                </Item>
                <div className="py-12" />
                <Item
                  itemType="group"
                  caption="Others"
                  colCount={2}
                  colSpan={2}
                >
                  <Item dataField="biography" dataType="string" colSpan={2} />
                </Item>
              </Form>
            </Editing>

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

            <Paging defaultPageSize={5} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />
          </DataGrid>
        </SimpleCard>
      </div>
    );
  }
}

export default AppClient;
