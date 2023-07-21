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
import Languages from './pages/Languages.js';

const service = new WorldService();

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
          </Route>
          <Route path="/cities">
            <Route index element={ <Cities /> } />
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