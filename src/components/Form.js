import React, { Component } from "react";
const yup = require("yup");

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.isValidSync(this.state.data, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const options = { strict: true };
    const obj = { [name]: value };
    const _schema = yup.object().shape({ [name]: this.schema[name] });
    try {
      const validObj = _schema.validateSync(obj, options);
      return null;
    } catch (e) {
      const errorMessage = { name: [name], message: e.message };
      return errorMessage;
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
