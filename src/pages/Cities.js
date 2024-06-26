import { useState } from "react";
import CountriesDropDown from "../components/CountriesDropDown";
import WorldService from "../services/WorldService";
import CitiesTable from "../components/CitiesTable";
import withLoading from '../components/withLoading.js';

const service = new WorldService();

export default function Cities(props) {
  console.log(`Cities.render()`);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ cities, setCities ] = useState([]);

  function handleCountryChange(country, e) {
    console.log(`Cities.handleCountryChange(${ country })`, e);
    setCities([]);
    if (country) {
      setIsLoading(true);
      service.getAllCitiesForCountry(country).then((data) => {
        setIsLoading(false);
        setCities(data);
      });
    }
  }

  const LoadingCitiesTable = withLoading(CitiesTable);
  return(
    <>
      <h2>Cities</h2>
      <div className="mb-3 row">
        <label htmlFor="countrySelect" className="col-sm-2 col-form-label">Country</label>
        <div className="col-sm-10">
          <CountriesDropDown id="countrySelect" onCountryChange={ handleCountryChange } />
        </div>
      </div>
      <LoadingCitiesTable loading={ isLoading } cities={ cities } />
    </>
  );
}