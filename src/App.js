import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Countries from './pages/Countries';
import Country from './pages/Country';
import Cities from './pages/Cities';
import Languages from './pages/Languages';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/countries">
            <Route index element={ <Countries /> } />
            <Route path=":country_code" element={ <Country /> } />
          </Route>
          <Route exact path="/cities" element={ <Cities /> } />
          <Route exact path="/languages" element={ <Languages /> } />
        </Routes>
      </Router>
    </>
  );
}