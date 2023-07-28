import { useState, useEffect } from 'react';
import WorldService from '../services/WorldService';
import CountryList from '../components/CountryList';

const TAG = 'Countries';
const service = new WorldService();

export default function Countries(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    service.getCountries().then((countries) => {
      setCountries(countries);
    });
  }, [ ]);

  return (
    <>
      <h2>Countries</h2>
      <CountryList countries={ countries } />
    </>
  );
}