import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authUser } from "../actions/userActions";
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
import { withStyles } from "@material-ui/core/styles";
import { Link, NavLink, withRouter } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
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

class SignIn extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: "", password: "" },
      errors: {},
      openDialogue: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loginFailed) {
      localStorage.setItem("token", nextProps.authToken);
    }
  }

  schema = {
    email: yup
      .string()
      .required("Enter email.")
      .email("Enter a valid Email.")
      .label("Email"),
    password: yup
      .string()
      .required("Enter password")
      .label("Password")
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const loginReq = {
      email: this.state.data.email,
      password: this.state.data.password
    };
    this.props.authUser(loginReq);
  };

  render() {
    const { classes } = this.props;
    const { data, errors } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {this.props.loginFailed && (
            <Typography component="h6" variant="h5" color="error">
              Invalid email or password.
            </Typography>
          )}
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
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
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  authUser: PropTypes.func.isRequired
};

const styledSignIn = withStyles(styles)(SignIn);

const mapStateToProps = state => {
  return {
    authToken: state.users.authUser["data"],
    submitting: state.users["submitting"],
    loginFailed: state.users["loginFailed"]
  };
};

export default connect(
  mapStateToProps,
  { authUser }
)(styledSignIn);
