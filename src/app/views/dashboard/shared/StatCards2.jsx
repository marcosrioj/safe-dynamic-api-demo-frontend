import React from "react";
import { Grid, Card, Icon, Fab } from "@material-ui/core";

const StatCards2 = ({ generalStats }) => {
  const percent =
    (generalStats.this_month_sales * 100) / generalStats.last_month_sales - 100;

  return (
    <Grid container spacing={3} className="mb-24">
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-16">
          <div className="flex flex-middle">
            <Fab
              size="medium"
              className="bg-light-green circle-44 box-shadow-none"
            >
              <Icon className="text-green">trending_up</Icon>
            </Fab>
            <h5 className="font-weight-500 text-green m-0 ml-12">
              Active Clients
            </h5>
          </div>
          <div className="pt-16 flex flex-middle">
            <h2 className="m-0 text-muted flex-grow-1">
              {generalStats.clients_active}
            </h2>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-16">
          <div className="flex flex-middle">
            <Fab
              size="medium"
              className="bg-light-error circle-44 box-shadow-none overflow-hidden"
            >
              <Icon className="text-error">star_outline</Icon>
            </Fab>
            <h5 className="font-weight-500 text-error m-0 ml-12">
              Transactions
            </h5>
          </div>
          <div className="pt-16 flex flex-middle">
            <h2 className="m-0 text-muted flex-grow-1">
              ${generalStats.this_month_sales}
            </h2>
            <div
              className={`ml-12 small-circle ${
                percent >= 0 ? "bg-green" : "bg-error"
              } text-white`}
            >
              <Icon className="small-icon">expand_less</Icon>
            </div>
            <span
              className={`font-size-13 ${
                percent >= 0 ? "text-green" : "text-error"
              } ml-4`}
            >
              ({percent >= 0 ? "+" : "-"}
              {percent.toFixed(2)}%)
            </span>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards2;
