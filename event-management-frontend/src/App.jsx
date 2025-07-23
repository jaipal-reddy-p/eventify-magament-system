import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";

// 🔴 Remove this until AuthContext exists
// import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      {/* <AuthProvider> */}
      <AppRoutes />
      {/* </AuthProvider> */}
    </Router>
  );
};

export default App;
