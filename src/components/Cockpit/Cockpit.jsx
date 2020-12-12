import React, { useEffect, useRef, useContext } from "react";
import classes from "./Cockpit.css";
import AuthContext from "../../context/auth-context";

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  const virtualHttpRequest = (time) => {
    setTimeout(() => {
      alert("Save data to the cloud");
    }, time);
  };

  // useEffect(() => {
  //   console.log("useEffect is working");
  //   // componentDidmount and componentDidUpdate combined in one effect.
  //   virtualHttpRequest(1000);
  //   // Only executes when props.persons changed
  // }, [props.persons]);

  useEffect(() => {
    console.log("useEffect is working");
    // componentDidmount and componentDidUpdate combined in one effect.
    // Only executes only when this component is rendered
    // const virtualHttp = virtualHttpRequest(1000);
    toggleBtnRef.current.click();
    // This automatically clicks the button when rendering
    return () => {
      // clearTimeout(virtualHttp);
      console.log("cockpit cleanup works in useEffect");
    };
  }, []);

  let btnClass = "";
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  const assignedClasses = [];
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }
  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>

      {<button onClick={authContext.login}>Login</button>}
    </div>
  );
};

// export default cockpit;
export default React.memo(cockpit);
// This way you can prevent this functional component from re-rendering like you can do with shouldUpdateComponent in class-based
