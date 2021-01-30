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
import { createDevExpressDataSource } from "utils";

const urlBase = `${BACKEND_URL}/dynamicapi/records/orders?order=date,desc`;
const urlViewBase = `${BACKEND_URL}/dynamicapi/records/orders_view?order=date,desc`;
const fiedlsToGet = [
  "id",
  "client_id",
  "client_name",
  "product_id",
  "date",
  "product_name",
  "status",
];
const datasource = createDevExpressDataSource(
  urlBase,
  fiedlsToGet,
  urlViewBase
);

class AppOrder extends React.Component {
  render() {
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Orders" }]} />
        </div>
        <div className="py-12" />
        <SimpleCard>
          <DataGrid
            dataSource={datasource}
            showBorders={true}
            remoteOperations={true}
            onRowInserting={(e) => {
              e.data.date = moment(
                e.data.date,
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
              <Popup title="Order" showTitle={true} width={700} height={325}>
                <Position my="top" at="top" of={window} />
              </Popup>
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item
                    dataField="client_id"
                    dataType="number"
                    validationRules={[
                      { type: "required", message: "ClientId is required." },
                    ]}
                  />
                  <Item
                    dataField="product_id"
                    dataType="number"
                    validationRules={[
                      { type: "required", message: "ProductId is required." },
                    ]}
                  />

                  <Item
                    dataField="status"
                    dataType="string"
                    editorType="dxSelectBox"
                    editorOptions={{
                      items: ["delivered", "in_progress"],
                      value: "",
                    }}
                    validationRules={[
                      { type: "required", message: "Status is required." },
                    ]}
                  />

                  <Item
                    dataField="date"
                    dataType="datetime"
                    validationRules={[
                      { type: "required", message: "Date is required." },
                    ]}
                  />
                </Item>
              </Form>
            </Editing>

            <Column dataField="id" dataType="number" width={75} />
            <Column dataField="client_id" dataType="number" visible={false} />
            <Column dataField="client_name" dataType="string" />
            <Column dataField="product_id" dataType="number" visible={false} />
            <Column dataField="product_name" dataType="string" />
            <Column dataField="date" dataType="date" />
            <Column dataField="status" dataType="string" />
            <Paging defaultPageSize={5} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />
          </DataGrid>
        </SimpleCard>
      </div>
    );
  }
}

export default AppOrder;
