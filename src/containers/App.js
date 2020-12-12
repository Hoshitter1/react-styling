import React, { Component } from "react";
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClasss from "../hoc/withClasses";
import Aux from "../hoc/Aux";
import AuthContext from "../context/auth-context";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("(LifeCycleCheck)[App.js] constructor");
  }
  state = {
    persons: [
      { id: "asfa1", name: "Max", age: 28 },
      { id: "vasdf1", name: "Manu", age: 29 },
      { id: "asdf11", name: "Stephanie", age: 26 },
    ],
    otherState: "some other value",
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("(LifeCycleCheck)[App.js] getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("(LifeCycleCheck)[App.js] componentDidMount");
  }

  // shouldComponentUpdate(nextProp, nextState) {
  //   console.log("(LifeCycleCheck)[App.js] shouldComponentUpdate");
  //   return false;
  // }

  componentWillUnmount() {
    console.log("(LifeCycleCheck)[App.js] componentWillUnmount");
  }

  componentDidUpdate() {
    console.log("(LifeCycleCheck)[App.js] componentDidUpdate");
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // this.setState({ persons: persons, changeCounter: this.state.changeCounter + 1 });
    // IMPORTANT: This way you can avoid an unexpected behavior of counter when updating something from an old state
    this.setState((prevState, props) => {
      return { persons: persons, changeCounter: prevState.changeCounter + 1 };
    });
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log("(LifeCycleCheck)[App.js] render");
    return (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showCockpit: !this.state.showCockpit });
          }}
        >
          remove Cockpit
        </button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler,
          }}
        >
          {this.state.showCockpit && (
            <Cockpit
              title={this.props.appTitle}
              personsLength={this.state.persons.length}
              showPersons={this.state.showPersons}
              clicked={this.togglePersonsHandler}
            />
          )}

          {this.state.showPersons && (
            <Persons
              persons={this.state.persons}
              changed={this.nameChangedHandler}
              clicked={this.deletePersonHandler}
            />
          )}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClasss(App, classes.App);
// error handlers/ sends analytics/ something that does not directly related jsx should use hoc like this
