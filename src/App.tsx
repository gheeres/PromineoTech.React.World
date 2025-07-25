import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CountriesPage from './pages/CountriesPage';
import LanguagesPage from './pages/LanguagesPage';
import CitiesPage from './pages/CitiesPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  console.log("App()");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/countries" element={ <CountriesPage /> }>
          </Route>
          <Route path="/cities" element={ <CitiesPage /> }>
          </Route>
          <Route path="/languages" element={ <LanguagesPage /> }>
          </Route>
          <Route path="/profile" element={ <ProfilePage /> } />
        </Routes>
      </Router>
    </>
  )
}