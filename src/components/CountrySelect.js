import { useEffect, useState } from "react";
import WorldService from "../services/WorldService";

const TAG = 'CountrySelect';
const service = new WorldService();

export default function CountrySelect(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const country = props.country;
  const disabled = props.disabled || false;
  let [ countries, setCountries ] = useState(props.countries || []);

  useEffect(() => {
    const exclude = props.exclude || [];
    service.getCountries().then((countries) => {
      setCountries(countries.filter((c) => (c.country_code === country) || (! exclude.includes(c.country_code))));
    });
  }, [ props.exclude, country ]);
  
  function handleOnChange(e) {
    const country = e.target.value;
    console.debug(`${ TAG }.handleOnChange(${ country })`);
    if (props.onChange) {
      props.onChange(country, e)
    }
  }

  const options = countries.map((country) => {
    return <option key={ country.country_code } value={ country.country_code }>
             { country.country_name }
           </option>;
  });

  return (
    <select id={ props.id } className="form-select mt-2" disabled={ disabled } aria-label="Select country" 
            onChange={ handleOnChange } value={ country }>
      <option value="">Select country...</option>
      { options }
    </select>
  );
};