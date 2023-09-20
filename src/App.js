import { useState, useEffect } from 'react';
import './App.css';
import WorldService from './services/WorldService';
import CountryTable from './components/CountryTable';
import CountrySelect from './components/CountrySelect';

const service = new WorldService();

export default function App() {
  const [ countries, setCountries ] = useState([]);
  useEffect(() => {
    service.getAllCountries().then((data) => {
      //console.log(data);
      setCountries(data);
    });
  }, []);

  function handleCountrySelect(country, e) {
    if (country) {
      console.log(`SELECTED: ${ country }`);
    }
  }
  return (
    <>
      <p>Around the world... so many countries... so many languages!</p>
      <CountrySelect countries={ countries } onCountrySelect={ handleCountrySelect } />
      <CountryTable countries={ countries } />
    </>
  );
}