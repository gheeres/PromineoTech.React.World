import { useEffect, useState } from 'react';
import './App.css';
import CountriesTable from './components/CountriesTable';
import WorldService from './services/WorldService';

let service = new WorldService();

export default function App() {
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    service.allCountries().then(countries => {
      setCountries(countries);
    });
  }, [ ]);
  
  function handleDelete(country, e) {
    if (country) {
      console.log(`App.handleDelete(${ country })`);
    }
  }

  return (
    <>
    <p>Around the world... so many countries... so many languages!</p>
    <CountriesTable countries={ countries } onDelete={ handleDelete } />
    </>
  );
}