import { useEffect, useState } from 'react';
import '../App.css';
import CountriesTable from '../components/CountriesTable';
import WorldService from '../services/WorldService';
import withLoading from '../components/withLoading.js';

let service = new WorldService();

export default function Countries(props) {
  const [ countries, setCountries ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    service.allCountries().then(countries => {
      setIsLoading(false);
      setCountries(countries);
    });
  }, [ ]);
  
  function handleDelete(country, e) {
    if (country) {
      console.log(`App.handleDelete(${ country })`);
    }
  }

  const LoadingCountriesTable = withLoading(CountriesTable); 
  return (
    <>
      <h2>Countries</h2>
      <LoadingCountriesTable loading={ isLoading } countries={ countries } onDelete={ handleDelete } />
    </>
  );
}