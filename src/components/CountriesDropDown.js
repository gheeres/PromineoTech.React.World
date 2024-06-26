import { useState, useEffect } from "react";
import WorldService from '../services/WorldService.js';
import Spinner from "./Spinner.js";
import withLoading from "./withLoading.js";

const service = new WorldService();

export default function CountriesDropDown(props) {
  console.log(`CountriesDropDown.render()`, props);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ countries, setCountries ] = useState(props.countries || []);
  
  useEffect(() => {
    console.log(`CountriesDropDown.useEffect()...`);
    if (! countries?.length) {
      setIsLoading(true);
      service.allCountries().then(data => {
        setIsLoading(false);
        setCountries(data);
      });
    }
  }, [ ]);

  const options = countries.map((country,index) => {
    return (
      <option key={ country.country_code } value={ country.country_code }>
        { country.country_name }
      </option>
    );
  });

  function handleChange(e) {
    const value = e.target.value;
    console.debug(`CountriesDropDown.handleChange(${ value })`, e);
    if (props.onCountryChange) {
      props.onCountryChange(value, e);  
    }
  }

  return (
    isLoading 
      ? <Spinner />
      :  <select id={ props.id } className="form-select" onChange={ handleChange } >
           { options }
         </select>
  );
}