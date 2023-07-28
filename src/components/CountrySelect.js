import { useEffect, useState } from 'react';
import WorldService from '../services/WorldService.js';

const service = new WorldService();


export default function CountrySelect(props) {
  const id = props.id || 'country-select';  
  let selectedCountry = props.country;
  const [ countries, setCountries ] = useState(props.countries || []);
  let disabled = props.disabled || false;

  function handleOnChange(e) {
    const country = e.target.value;
    if (country) {
      if (props.onChange) {
        props.onChange(country, e);
      }
    }
  }

  useEffect(() => {
    service.getCountries().then(data => {
      setCountries(data);
      disabled = false;
    });
  }, [ ]);

  let options = countries.map((country,index) => {
    return(
      <option key={ country.country_code }
              value={ country.country_code }>{ country.country_name }</option>
    );
  });

  console.log(selectedCountry);
  return(
    <select id={ id  } value={ selectedCountry } onChange={ handleOnChange } className="form-select mt-2" disabled={ disabled }>
      <option value="">Select country...</option>
      { options }
    </select> 
  );
}