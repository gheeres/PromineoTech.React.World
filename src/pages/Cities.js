import { useState, useEffect } from 'react';

import CountrySelect from '../components/CountrySelect.js';
import CityTable from '../components/CityTable.js';
import WorldService from '../services/WorldService.js';

const service = new WorldService();

export default function Cities(props) {
  let countries = props.countries || [];
  const [ country, setCountry ] = useState(props.country);
  const [ cities, setCities ] = useState(props.cities || []);

  useEffect(() => {
    service.getCitiesForCountry(country).then((data) => {
      setCities(data);
    });
  }, [ country ]);

  function handleCountryChanged(country, e) {
    if (country) {
      console.log(`Country Changed: ${ country }`);
      setCountry(country);
    }
  }

  console.log(`Cities.render(${ JSON.stringify(props) })`);
  return(
    <>
      <h2>Cities</h2>
      <CountrySelect id="country" countries={ countries } onChange={ handleCountryChanged } />
      <CityTable cities={ cities } />
    </>
  )
}