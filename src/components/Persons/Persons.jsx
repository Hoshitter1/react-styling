import React, { Component } from "react";
import Person from "./Person/Person";
import Aux from "../../hoc/Aux";

class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = { test: "hi" };
  }
  static getDerivedStateFromProps(props, state) {
    console.log("(LifeCycleCheck)[Person.js] getDerivedStateFromProps");
    return state;
  }

  // NOTE: JUST USE PureComponent instead of manually writing these
  shouldComponentUpdate(nextProps, nextState) {
    // This prevents this component from rendering when other state has been changed such as cockpit
    if (
      this.props.persons !== nextProps.persons ||
      this.props.changed !== nextProps.changed ||
      this.props.clicked !== nextProps.clicked
    ) {
      return true;
    }
    return false;
  }

  //   componentWillUpdate() {
  //     Depreciated due to the fact that it's often used correctyly and hard to justify
  //   }

  // componentWillReceiveProps{
  //     Depreciated due to the fact that it's often used correctyly and hard to justify
  //       }

  getSnapshotBeforeUpdate(prevProps, preState) {
    console.log("(LifeCycleCheck)[Person.js] getSnapshotBeforeUpdate");
    // Save data before update
    return { message: "snapshot!" };
  }

  componentDidUpdate(prevProps, preState, snapshot) {
    console.log("(LifeCycleCheck)[Person.js] componentDidUpdate");
    console.log(snapshot);
  }

  render() {
    console.log("(LifeCycleCheck)[Persons.js] render");
    return (
      <Aux>
        {this.props.persons.map((person, index) => {
          return (
            <Person
              click={() => this.props.clicked(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.props.changed(event, person.id)}
            />
          );
        })}
      </Aux>
    );
  }
}

export default Persons;
