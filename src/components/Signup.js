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
      errors: { name: "", email: "", password: "" },
      openDialogue: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ openDialogue: nextProps.userAdded });
    if (nextProps.emailError) {
      const data = { ...this.state.data };
      const errors = { ...this.state.errors };
      errors["email"] = "This email is already in use.";
      this.setState({ data, errors });
    }
  }

  schema = {
    name: yup
      .string()
      .required()
      .matches(/^[a-zA-Z ]*$/, "Enter a valid name.")
      .min(5)
      .max(50)
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

  resetForm = () => {
    this.setState({
      data: { name: "", email: "", password: "" },
      errors: { name: "", email: "", password: "" },
      openDialogue: false,
      userAdded: false,
      emailError: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const user = {
      name: this.state.data.name,
      email: this.state.data.email,
      password: this.state.data.password
    };
    this.props.createUser(user);
  };

  userAdded = () => {
    return this.props.userAdded;
  };

  emailExists = () => {
    return this.props.emailError;
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
                      {errors["name"]}
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
                      {errors["email"]}
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
                      {errors["password"]}
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
          resetForm={this.resetForm}
          username={data.name}
        />
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    submitting: state.users["submitting"],
    userAdded: state.users["userAdded"],
    emailError: state.users["emailError"]
  };
};
const styledSignUp = withStyles(styles)(SignUp);

export default connect(
  mapStateToProps,
  { createUser }
)(styledSignUp);
