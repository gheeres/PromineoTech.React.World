import { useEffect, useState } from "react";
import { getAllCountries } from "../services/CountryService";
import { Country } from "../types";

export default function CountryDropdown() {
  const [ countries, setCountries ] = useState<Country[] | null>([]);
  useEffect(() => {
    (async () => {
       let countries = await getAllCountries();
       setCountries(countries);
    })();
  }, []);
    
  let options = countries?.map((country,index) => {
    return ( 
      <option key={ country?.code || index }>{ country.name }</option>
    );
  });
  return(
    <select className="form-select">
      { options }
    </select>
  );
}