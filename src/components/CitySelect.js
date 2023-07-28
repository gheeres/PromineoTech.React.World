import { useEffect, useState } from "react";
import WorldService from "../services/WorldService";

const TAG = 'CitySelect';
const service = new WorldService();

export default function CitySelect(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const country = props.country;
  const city_id = props.city_id;
  const disabled = props.disabled || false;
  let [ cities, setCities ] = useState(props.cities || []);

  useEffect(() => {
    const exclude = props.exclude || [];
    service.getCitiesForCountry(country).then((cities) => {
      setCities(cities.filter((c) => (c.city_id === city_id) || (! exclude.includes(c.city_id))));
    });
  }, [ props.exclude, country ]);
  
  function handleOnChange(e) {
    const city_id = e.target.value;
    console.debug(`${ TAG }.handleOnChange(${ city_id })`);
    if (props.onChange) {
      props.onChange(city_id, e)
    }
  }

  const options = cities.map((city) => {
    return <option key={ city.city_id } value={ city.city_id }>
             { city.city_name }
           </option>;
  });

  return (
    <select id={ props.id } className="form-select mt-2" disabled={ disabled } aria-label="Select city" 
            onChange={ handleOnChange } value={ city_id }>
      <option value="">Select city...</option>
      { options }
    </select>
  );
};