import { useEffect, useState } from "react";
import CountryDropDown from "../components/CountryDropDown";
import CityTable from "../components/CityTable";
import { City, Country } from "../types";
import { getAllCountries, getCitiesForCountry } from "../hooks/useWorldService";

type CitiesProps = {
};

export default function Cities(props: CitiesProps) {
  const [ countries, setCountries ] = useState<Country[]>([]);
  const [ cities, setCities ] = useState<City[]>([]);
  
  useEffect(() => {
    (async () => {
      const response = await getAllCountries();  
      setCountries(response);
    })();
  }, [ ]);
  console.log(`Cities()`);

  async function handleCountryChanged(country: Country, e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(`handleCounryChange(${ country?.code })`);
    if (country) {
      let cities = await getCitiesForCountry(country.code);
      setCities(cities);
    }
  }

  return(
    <>
      <h1>Cities</h1>
      <CountryDropDown countries={ countries } onCountryChanged={ handleCountryChanged } />
      { cities.length > 0 ? <CityTable cities={ cities } /> : null }
    </>
  );
}