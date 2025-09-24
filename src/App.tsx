import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Countries from './pages/Countries';
import Cities from './pages/Cities';
import Languages from './pages/Languages';
import Country from './pages/Country';

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
          <Route path="/cities" element={ <Cities /> } />
          <Route path="/languages" element={ <Languages /> } />
        </Routes>
      </Router>
   </>
  )
}