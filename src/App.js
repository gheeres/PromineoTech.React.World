import './App.css';
import { useState, useEffect } from 'react';
import CountryTable from './components/CountryTable.js';
import CountrySelect from './components/CountrySelect.js';
import CityTable from './components/CityTable.js';

export default function App() {
  const countries = [
    {
      "country_code": "AFG",
      "country_name": "Afghanistan",
      "country_code2": "AF",
      "continent": "Asia",
      "country_population": 22720000,
      "capital": {
        "city_id": 8377,
        "city_name": "Kabul"
      }
    },
    {
      "country_code": "ALB",
      "country_name": "Albania",
      "country_code2": "AL",
      "continent": "Europe",
      "country_population": 3401200,
      "capital": {
        "city_id": 8932,
        "city_name": "Tirana"
      }
    },
    {
      "country_code": "USA",
      "country_name": "United States",
      "country_code2": "US",
      "continent": "North America",
      "country_population": 278357000,
      "capital": {
        "city_id": 8321,
        "city_name": "Washington"
      }
    }    
  ];

  const [ country, setCountry ] = useState(""); // [ variable/data , setFunction ]
  const [ cities, setCities ] = useState([]);
  useEffect(() => {
    (async function() {
      if (country) {
        const url = `http://localhost:3000/countries/${ country }/cities`;
        console.log(`Requesting cities at ${ url }...`);
        
        const res = await fetch(url);
        const data = await res.json(); 
        setCities(data);
        console.log('Cities retrieved.', cities);
  
        // fetch(url).then((res) => res.json())
        //           .then((data) => {
        //   setCities(data);
        //   console.log('Cities retrieved.', cities);
        // });
      }
    })();
  }, [ country ]);

  function handleCountrySelected(country_code, e) {
    console.log(`App.handleCountrySelect(${ country_code })...`);
    setCountry(country_code);
  }

  console.log(`App.render()`);
  return (
    <>
      Around the world... so many countries... so many languages!
      <CountrySelect countries={ countries } country={ country } 
                     onSelected={ handleCountrySelected } />
      <CityTable cities={ cities } />
    </>
  );
}