import './App.css';
import WorldService from './services/WorldService.js';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, 
  Routes, Route
} from 'react-router-dom';
import Home from './pages/Home.js';
import Cities from './pages/Cities.js';
import Countries from './pages/Countries.js';
import Country from './pages/Country.js';
import Languages from './pages/Languages.js';

const service = new WorldService();
const defaultCountry = 'CUB';

function App() {
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    service.getCountries().then(data => {
      setCountries(data);
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route extract path="/" element={ <Home /> } />
          <Route path="/countries">
            <Route index element={ <Countries countries={ countries } /> } />
            <Route path=":country" element={ <Country /> } />
          </Route>
          <Route path="/cities">
            <Route index element={ <Cities country={ defaultCountry } /> } />
          </Route>
          <Route path="/languages">
            <Route index element={ <Languages /> } />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;