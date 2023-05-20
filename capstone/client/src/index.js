//https://legacy.reactjs.org/docs/getting-started.html
import React from "react";
//https://legacy.reactjs.org/docs/react-dom-client.html
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//https://mui.com/material-ui/customization/theming/
import { ThemeProvider } from "@mui/material/styles";
//https://mui.com/material-ui/react-css-baseline/
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
//https://react-redux.js.org/api/provider
import { Provider } from "react-redux";
//https://redux-toolkit.js.org/api/configureStore
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state";


//https://redux-toolkit.js.org/api/configureStore
const store = configureStore({
  reducer: { cart: cartReducer },
});
//https://legacy.reactjs.org/docs/rendering-elements.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
