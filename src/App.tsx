import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Cities from './pages/Cities'
import Countries from './pages/Countries'
import Languages from './pages/Languages'
import Country from './pages/Country'

export default function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/cities" element={ <Cities /> } />
        <Route path="/countries">
          <Route index element={ <Countries /> } />
          <Route path=":country" element={ <Country /> } />
        </Route>
        <Route path="/languages" element={ <Languages /> } />
      </Routes>
    </Router>
  )
}