import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCSQwE6YeDZoE9yAOKDdkA2wz8FF9z_nGU",
  authDomain: "vidly-7eb1e.firebaseapp.com",
  databaseURL: "https://vidly-7eb1e.firebaseio.com",
  projectId: "vidly-7eb1e",
  storageBucket: "gs://vidly-7eb1e.appspot.com",
  messagingSenderId: "743169600311",
  appId: "1:743169600311:web:cfcc27462521c850"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
