import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./Redux/Store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
   <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>
);


