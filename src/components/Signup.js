import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
import createUser from "../actions/userActions";
import DialogBox from "./DialogBox";
import Form from "./Form";

const yup = require("yup");
var Joi = require("joi-browser");

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignUp extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { name: "", email: "", password: "" },
      errors: {},
      openDialogue: false
    };
  }

  schema = {
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter a valid name.")
      .min(5)
      .max(50)
      .required()
      .label("Name"),
    email: yup
      .string()
      .email("Enter a valid Email.")
      .label("Email"),
    password: yup
      .string()
      .required("Enter password")
      .label("Password")
  };

  resetDialogBox = () => {
    this.setState({
      openDialogue: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.data.name,
      email: this.state.data.email,
      password: this.state.data.password
    };
    console.log(user);
    this.setState({
      openDialogue: true
    });
    this.props.createUser(user);
    alert("User Added!");
  };

  render() {
    const { classes } = this.props;
    const { data, errors } = this.state;

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                    error={errors["name"]}
                    value={data.name}
                    onChange={this.handleChange}
                  />
                  {errors["name"] && (
                    <FormHelperText id="component-helper-text" error={true}>
                      {errors["name"].message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    error={errors["email"]}
                    value={data.email}
                    onChange={this.handleChange}
                  />
                  {errors["email"] && (
                    <FormHelperText id="component-helper-text" error={true}>
                      {errors["email"].message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={this.state.data.password}
                    onChange={this.handleChange}
                  />
                  {errors["password"] && (
                    <FormHelperText id="component-helper-text" error={true}>
                      {errors["password"].message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </Container>
        <DialogBox
          isOpen={this.state.openDialogue}
          resetDialogBox={this.resetDialogBox}
        />
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired
};

const styledSignUp = withStyles(styles)(SignUp);

export default connect(
  null,
  { createUser }
)(styledSignUp);
