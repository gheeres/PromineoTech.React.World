import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/countries">
            <Route path=":countryCode" element={ <CountryPage /> } />
          </Route>
        </Routes>
      </Router>
    </>
  )
}