import { useEffect, useState } from "react";
import CitiesTable from "../components/CitiesTable";
import CountriesDropDownList from "../components/CountriesDropDownList";
import { CityModel, CountryModel } from "../types";
import { getAllCitiesForCountry, getAllCountries } from "../hooks/useWorldService";

type CitiesProps = {
};

export default function Cities(props: CitiesProps) {
  const [ countries, setCountries ] = useState<CountryModel[]>([]);
  const [ cities, setCities ] = useState<CityModel[]>([]);
  const [ country, setCountry ] = useState<string>('');

  useEffect(() => {
   (async () => {
    let countries = await getAllCountries();
    setCountries((existing) => countries);
   })();
  }, []);
  useEffect(() => {
   (async () => {
     let cities = await getAllCitiesForCountry(country);
     setCities((existing) => cities);
   })();
  }, [ country ])
  
  function handleCountryChange(e: React.ChangeEvent) {
    setCountry((existing) => e.target.value);
  }

  return(
    <>
      <h2>Cities</h2>
      <CountriesDropDownList countries={ countries } onCountryChange={ handleCountryChange } />
      <CitiesTable cities={ cities } />
    </>
  );
}
