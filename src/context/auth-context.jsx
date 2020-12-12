import React from "react";

// This allows us to use data without passing it through components that dont care about data.
const authContext = React.createContext({
  authenticated: false,
  login: () => {},
});
// Default value is only for better auto completion that IDE gives

export default authContext;
