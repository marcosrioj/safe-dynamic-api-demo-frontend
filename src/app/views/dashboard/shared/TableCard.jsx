import React from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { numFormatter } from "utils";

const TableCard = ({ top5Sales }) => {
  return (
    <Card elevation={3} className="pt-20 mb-24">
      <div className="card-title px-24 mb-12">top selling products</div>
      <div className="overflow-auto">
        <Table className="product-table">
          <TableHead>
            <TableRow>
              <TableCell className="px-24" colSpan={5}>
                Name
              </TableCell>
              <TableCell className="px-0" colSpan={1}>
                Total
              </TableCell>
              <TableCell className="px-0" colSpan={1}>
                Sales
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Stock Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top5Sales.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" colSpan={5} align="left">
                  <div className="flex flex-middle">
                    <img
                      className="circular-image-small"
                      src={`data:image/jpg;base64,${product.product_photo}`}
                      alt="user"
                    />
                    <p className="m-0 ml-8">{product.product_name}</p>
                  </div>
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={1}>
                  ${numFormatter(parseFloat(product.total_price_sales))}
                  {product.price > 999
                    ? (product.price / 1000).toFixed(1) + "k"
                    : product.price}
                </TableCell>

                <TableCell className="px-0 capitalize" align="left" colSpan={1}>
                  {product.total_sales}
                </TableCell>

                <TableCell className="px-0" align="left" colSpan={2}>
                  {product.product_stock ? (
                    product.product_stock < 1000 ? (
                      <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                        {product.product_stock} available
                      </small>
                    ) : (
                      <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                        in stock
                      </small>
                    )
                  ) : (
                    <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                      out of stock
                    </small>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TableCard;
