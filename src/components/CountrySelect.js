import { useEffect, useState } from "react";
import WorldService from "../services/WorldService";

const service = new WorldService();

export default function CountrySelect(props) {
  const [ countries, setCountries ] = useState(props.countries || []);
  useEffect(() => {
    if (! countries.length) {
      service.getAllCountries().then(data => {
        setCountries(data);
      });  
    }
  }, []);

  const options = countries.map((country,index) => {
    return(
      <option key={ country.code } value={ country.code }>{ country.name }</option>
    );
  });

  function handleChange(e) {
    const country = e.target.value;
    if (country) {
      if (props.onCountrySelect) {
        props.onCountrySelect(country, e);
      }  
    }
  }

  return(
    <select className="form-select" onChange={ handleChange }>
      { options }
    </select>
  );
}
