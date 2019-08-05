import React, { Component } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  FormHelperText
} from "@material-ui/core";

class Dashboard extends Component {
  render() {
    const user = this.props.user;
    return (
      <div>
        <Typography component="h1" variant="h5">
          {`Hello, ${user.name}`}
        </Typography>
      </div>
    );
  }
}

export default Dashboard;
