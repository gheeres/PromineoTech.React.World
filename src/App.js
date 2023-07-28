import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes, Route,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import notification from './store/notification.js';
import Notifications from "./components/Notifications";
import Home from './pages/Home';
import Countries from './pages/Countries';
import Country from './pages/Country';
import Cities from './pages/Cities';
import Languages from './pages/Languages';

const TAG = 'App';

const store = configureStore({
  reducer: {
    notification: notification,
  }
});

export default function App(props) {
  console.debug(`${ TAG }.ctor()`);

  return (
    <Provider store={ store }>
      <Notifications />
      <Router>
        <Routes>
          <Route extact path="/" element={ <Home /> } />
          <Route path="/countries">
            <Route index element={ <Countries /> } />
            <Route path=":country" element={ <Country /> } />
          </Route>
          <Route extact path="/cities" element={ <Cities /> } />
          <Route extact path="/languages" element={ <Languages /> } />
        </Routes>
      </Router>
    </Provider>
  );
}