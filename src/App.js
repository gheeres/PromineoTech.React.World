import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import WorldService from './services/WorldService.js';
import Home from './pages/Home.js';
import Cities from './pages/Cities.js';
import City from './pages/City.js';
import Countries from './pages/Countries.js';
import Country from './pages/Country.js';
import Languages from './pages/Languages.js';
import Language from './pages/Language.js';

const service = new WorldService();
export default function App() {
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    service.getAllCountries().then(data => {
      setCountries(data);
    });
  }, []);

  const defaultCountry = 'USA';
  console.log(`App.render()`);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element= { <Home /> } />
          <Route path="/countries">
            <Route index element={ <Countries countries={ countries } /> } />
            <Route path=":country" element={ <Country /> } />
          </Route>
          <Route path="/cities">
            <Route index element={ <Cities countries={ countries } 
                                           country={ defaultCountry } /> } />
            <Route path=":id" element={ <City /> } />
          </Route>
          <Route path="/languages">
            <Route index element={ <Languages /> } />
            <Route path=":code" element={ <Language /> } />
          </Route>
        </Routes>
      </Router>
    </>
  );
}