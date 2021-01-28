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

const urlBase = `${BACKEND_URL}/dynamicapi/records/campaigns`;
const fiedlsToGet = ["id", "name", "budget", "date"];
const datasource = createDevExpressDataSource(urlBase, fiedlsToGet);

class AppCampaign extends React.Component {
  render() {
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Campaigns" }]} />
        </div>
        <div className="py-12" />
        <SimpleCard>
          <DataGrid
            dataSource={datasource}
            showBorders={true}
            remoteOperations={true}
            onRowInserting={(e) => {
              e.data.date = moment(new Date(e.data.date), "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              );
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
              <Popup title="Campaign" showTitle={true} width={700} height={325}>
                <Position my="top" at="top" of={window} />
              </Popup>
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item
                    dataField="name"
                    editorType="dxSelectBox"
                    editorOptions={{
                      items: ["Facebook", "Google", "Twitter"],
                      value: "",
                    }}
                    validationRules={[
                      { type: "required", message: "Name is required." },
                    ]}
                  />
                  <Item
                    dataField="budget"
                    dataType="number"
                    validationRules={[
                      { type: "required", message: "Budget is required." },
                    ]}
                  />
                  <Item
                    dataField="date"
                    dataType="date"
                    validationRules={[
                      { type: "required", message: "Date is required." },
                    ]}
                  />
                </Item>
              </Form>
            </Editing>

            <Column dataField="id" dataType="number" width={75} />
            <Column dataField="name" dataType="string" />
            <Column dataField="budget" dataType="number" format="currency" />
            <Column dataField="date" dataType="date" />
            <Paging defaultPageSize={5} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />
          </DataGrid>
        </SimpleCard>
      </div>
    );
  }
}

export default AppCampaign;
