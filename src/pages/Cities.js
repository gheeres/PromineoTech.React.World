import { useState, useEffect } from 'react';
import WorldService from '../services/WorldService';
import CountrySelect from "../components/CountrySelect";
import withLoading from '../components/withLoading';
import CityTable from '../components/CityTable';

const service = new WorldService();

const LoadingCountrySelect = withLoading(CountrySelect);
const LoadingCityTable = withLoading(CityTable);

export default function Cities(props) {
  const [ country, setCountry ] = useState();
  const [ countries, setCountries ] = useState([]);
  const [ cities, setCities ] = useState([]);
  const [ loadingCountry, setLoadingCountry ] = useState(true);
  const [ loadingCity, setLoadingCity ] = useState(true);

  useEffect(() => {
    //console.log(`Cities.getAllCountries(): Loading Data...`);
    setLoadingCountry(true);
    service.getAllCountries().then((data) => {
      if ((! country) && (data.length > 0)) {
        setCountry(data[0].code);
      }
      setCountries(data);
      setLoadingCountry(false);
    });
  }, []);

  useEffect(() => {
    if (country) {
      //console.log(`Cities.getCitiesForCountry(${ country }): Loading Data...`);
      setLoadingCity(true);
      service.getCitiesForCountry(country).then((data) => {
        setCities(data);
        setLoadingCity(false);
      });
    }
  }, [ country ])
  
  function handleCountrySelect(country, e) {
    //console.log(`Cities.handleCountrySelect(${ country })`, e);
    if (country) {
      console.log(`Cities: Country Selected (${ country })`);
      setCountry(country);
    }
  }
  
  return(
    <>
      <h2>Cities</h2>
      <LoadingCountrySelect loading={ loadingCountry } countries={ countries } country={ country } 
                            onCountrySelect={ handleCountrySelect } />
      <hr />
      { 
        (loadingCountry || (! country))
          ? null
          : <LoadingCityTable loading={ loadingCity } cities={ cities } /> 
      }
    </>
  );
}