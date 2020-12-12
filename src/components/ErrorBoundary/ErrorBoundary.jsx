import React, { Component } from "react";

class ErrorBoundary extends Component {
  // Only use this when it makes sense so error message comes up when an error occured in production
  state = {
    hasError: false,
    errorMessage: "",
  };
  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMessage: error });
  };
  render() {
    if (this.state.hasError) {
      return <h1>this.state.errorMessage;</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
