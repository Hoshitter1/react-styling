import React, { Component } from "react";

import PropTypes from "prop-types";

import classes from "./Person.css";
import withClasss from "../../../hoc/withClasses";
import Aux from "../../../hoc/Aux";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  // This allows React to automatically connect this component here behind the scenes
  // So you dont need to wrap jsx with <AuthContext.Consumer> anymore
  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus();
    // older approach
    this.inputElementRef.current.focus();
  }
  render() {
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated!</p>
        ) : (
          <p>Please login</p>
        )}

        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>

        <p>{this.props.children}</p>
        <input
          type="text"
          // refs={(inputElement) => {
          //   this.inputElement = inputElement;
          // }}
          // older approach
          ref={this.inputElementRef}
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClasss(Person, classes.Person);
