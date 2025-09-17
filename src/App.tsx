import { useEffect, useState } from 'react';
import './App.css'
import { getAllCountries } from './hooks/useWorldService';
import { Country } from './types';
import CountryTable from './components/CountryTable';
import CountryDropDown from './components/CountryDropDown';

export default function App() {
  const [ countries, setCountries ] = useState<Country[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getAllCountries();  
      setCountries(response);
    })();
  }, [ ]);

  function handleCountryChanged(country: Country, e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(country);
  }
  console.log("App()");
  return (
    <>
      <h1>Countries of the World</h1>
      <p>Lets take a little journey...</p>

      <CountryDropDown countries={ countries } onCountryChanged={ handleCountryChanged } />
      <CountryTable countries={ countries } />
   </>
  )
}