import { useEffect, useState } from "react";
import { CountryModel } from "../types";
import { getAllCountries } from "../hooks/useWorldService";
import CountriesTable from "../components/CountriesTable";

type CountriesProps = {
};

export default function Countries(props: CountriesProps) {
  const [ countries, setCountries ] = useState<CountryModel[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getAllCountries();
      setCountries(response);
    })();
  }, []);

  console.log(countries);
  return(
    <>
      <h2>Countries</h2>
      <CountriesTable countries={ countries } />
    </>
  );
}