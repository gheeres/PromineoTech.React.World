import { useState, useEffect } from 'react';
import CountrySelect from '../components/CountrySelect.js';
import CityTable from '../components/CityTable.js';
import WorldService from '../services/WorldService.js';

const service = new WorldService();
export default function Cities(props) {
  const countries = props.countries || [];
  const [ country, setCountry ] = useState(props.country || ''); // [ variable/data , setFunction ]
  const [ cities, setCities ] = useState(props.cities || []);
  
  useEffect(() => {
    service.getAllCitiesForCountry(country).then(data => {
      setCities(data);
    });
  }, [ country ]);
  
  function handleCountrySelected(country_code, e) {
    console.log(`Cities.handleCountrySelect(${ country_code })...`);
    setCountry(country_code);
  }

  return(
    <>
      <h2>Cities</h2>
      <CountrySelect countries={ countries } country={ country } 
                     onSelected={ handleCountrySelected } />
      <CityTable cities={ cities } />
    </>
  );
};