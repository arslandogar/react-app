import React, { Component } from "react";
const yup = require("yup");

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    try {
      yup
        .object()
        .shape(this.schema)
        .validateSync(this.state.data, options);
      return null;
    } catch (e) {
      const errorMessages = {};
      for (let item of e.inner) {
        if (!errorMessages[item.path]) errorMessages[item.path] = item.message;
      }
      console.log(errorMessages);
      return errorMessages;
    }
  };

  validateProperty = ({ name, value }) => {
    const options = { strict: true };
    const obj = { [name]: value };
    const _schema = yup.object().shape({ [name]: this.schema[name] });
    try {
      _schema.validateSync(obj, options);
      return null;
    } catch (e) {
      return e.message;
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
}

export default Form;
