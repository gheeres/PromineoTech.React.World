import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Countries from './pages/Countries';
import Country from './pages/Country';
import Languages from './pages/Languages';
import Language from './pages/Language';
import Cities from './pages/Cities';
import City from './pages/City';

export default function App() {
  console.log("App()");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/countries">
            <Route index element={ <Countries /> } />
            <Route path=":country_code" element={ <Country /> } />
          </Route>
          <Route path="/cities">
            <Route index element={ <Cities /> } />
            <Route path=":city_id" element={ <City /> } />
          </Route>
          <Route path="/languages">
            <Route index element={ <Languages /> } />
            <Route path=":language_code" element={ <Language /> } />
          </Route>
        </Routes> 
      </Router>
    </>
  )
}