import { useEffect, useState } from "react";
import CountryTable from "../components/CountryTable";
import { Country } from "../types";
import { getAllCountries } from "../services/CountryService";
type CountriesProps = {
  countries?: Country[]  
};

export default function Countries(props: CountriesProps) {
  const [ countries, setCountries ] = useState<Country[]>(props.countries || []);

  useEffect(() => {
    (async () => {
      if (countries.length === 0) {
        let countries = await getAllCountries();
        setCountries(countries);
      }
    })();
  }, []);
  
  return (
    <>
      <h1>Countries</h1>
      <CountryTable countries={ countries } />
    </>
  )
}