import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SearchContexProvider } from "./context/SearchContext.jsx";
import { AuthContexProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContexProvider>
      <SearchContexProvider>
        <App />
      </SearchContexProvider>
    </AuthContexProvider>
  </React.StrictMode>
);
