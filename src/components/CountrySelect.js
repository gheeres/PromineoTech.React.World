import { useEffect, useState } from "react";
import WorldService from "../services/WorldService";

const service = new WorldService();

export default function CountrySelect(props) {
  const [ countries, setCountries ] = useState(props.countries || []);
  const country = props.country;

  useEffect(() => {
    if (! countries.length) {
      //console.log(`CountrySelect.getAllCountries(): Loading Data...`);
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
    //console.log(`CountrySelect.handleChange(${ country })`, e);
    if (country) {
      if (props.onCountrySelect) {
        props.onCountrySelect(country, e);
      }  
    }
  }

  return(
    <select className="form-select" onChange={ handleChange } value={ country }>
      { options }
    </select>
  );
}
