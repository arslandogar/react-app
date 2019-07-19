import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "typeface-roboto";
import SignUp from "./components/Signup";
import NavBar from "./components/NavBar";
import SignIn from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route path="/login" component={SignIn} />
        <Route exact path="/" component={SignUp} />
      </div>
    </BrowserRouter>
  );
}

export default App;
