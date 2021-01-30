import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";

import history from "history.js";

const StatCards = ({ theme, generalStats }) => {
  return (
    <Grid container spacing={3} className="mb-24">
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main,
              }}
            >
              group
            </Icon>
            <div className="ml-12">
              <small className="text-muted">New Clients</small>
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                {generalStats.clients_total}
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton
              onClick={() => {
                history.push({
                  pathname: "/clients",
                });
              }}
            >
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main,
              }}
            >
              attach_money
            </Icon>
            <div className="ml-12">
              <small className="text-muted">This week Sales</small>
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                ${generalStats.this_week_sales}
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton
              onClick={() => {
                history.push({
                  pathname: "/orders",
                });
              }}
            >
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main,
              }}
            >
              store
            </Icon>
            <div className="ml-12">
              <small className="text-muted">Orders delivered</small>
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                {generalStats.orders_delivered} Orders
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton
              onClick={() => {
                history.push({
                  pathname: "/orders",
                });
              }}
            >
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main,
              }}
            >
              shopping_cart
            </Icon>
            <div className="ml-12">
              <small className="text-muted">Orders to deliver</small>
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                {generalStats.orders_in_progress} Orders
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton
              onClick={() => {
                history.push({
                  pathname: "/orders",
                });
              }}
            >
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards;
