import { useEffect, useState } from 'react';
import './App.css'
//import CountryTable from './components/CountryTable';
import { City, Country } from './types';
import { getAllCountries } from './services/CountryService';
import CountryDropDown from './components/CountryDropDown';
import CityTable from './components/CityTable';
import { getAllCitiesForCountry } from './services/CityService';

export default function App() {
  const [ country, setCountry ] = useState<Country | null>();
  const [ countries, setCountries ] = useState<Array<Country>>([]);
  const [ cities, setCities ] = useState<Array<City>>([]);
  
  useEffect(() => {
    (async () => {
      const countries = await getAllCountries();
      setCountries(countries);
    })();
  }, []);
  useEffect(() => {
   (async () => {
     if (country?.code) {
      const cities = await getAllCitiesForCountry(country.code);
      setCities(cities);
    }
  })();
  }, [ country ] )


  function handleCountrySelected(country: Country | null, e: React.ChangeEvent<HTMLSelectElement>) {
    setCountry(country);
  }

  return (
    <>
      <h1>Countries of the World</h1>
      <p>Lets take a little journey...</p>
      <CountryDropDown countries={ countries } onCountrySelected={ handleCountrySelected } />
      <CityTable cities={ cities } />
    </>
  )
}