import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "typeface-roboto";

import jwtDecode from "jwt-decode";
import SignUp from "./components/Signup";
import NavBar from "./components/NavBar";
import SignIn from "./components/Login";
import Dashboard from "./components/Dashboard";
import store from "./Store";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
      console.log(this.state.user);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <NavBar />
            <Route path="/login" component={SignIn} />
            <Route
              path="/dashboard"
              component={() => <Dashboard user={this.state.user} />}
            />
            <Route exact path="/" component={SignUp} />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
