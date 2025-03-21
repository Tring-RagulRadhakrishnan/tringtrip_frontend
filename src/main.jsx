import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/poppins";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client";
import { Client } from "./apollo/client.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={Client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
