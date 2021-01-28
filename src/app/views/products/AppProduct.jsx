import React from "react";
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

const urlBase = `${BACKEND_URL}/dynamicapi/records/products`;
const fiedlsToGet = ["id", "name", "photo", "price", "stock"];
const datasource = createDevExpressDataSource(urlBase, fiedlsToGet);

function photoRender(data) {
  return <img src={`data:image/jpg;base64,${data.value}`} alt="" />;
}

class AppProduct extends React.Component {
  render() {
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Products" }]} />
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

            <Editing
              mode="popup"
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true}
            >
              <Popup title="Product" showTitle={true} width={700} height={325}>
                <Position my="top" at="top" of={window} />
              </Popup>
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item
                    dataField="name"
                    dataType="string"
                    validationRules={[
                      { type: "required", message: "Name is required." },
                    ]}
                  />
                  <Item
                    dataField="price"
                    dataType="number"
                    validationRules={[
                      { type: "required", message: "Price is required." },
                    ]}
                  />
                  <Item
                    dataField="stock"
                    dataType="number"
                    validationRules={[
                      { type: "required", message: "Stock is required." },
                    ]}
                  />
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
            <Column dataField="price" dataType="number" format="currency" />
            <Column dataField="stock" dataType="number" />
            <Paging defaultPageSize={5} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />
          </DataGrid>
        </SimpleCard>
      </div>
    );
  }
}

export default AppProduct;
