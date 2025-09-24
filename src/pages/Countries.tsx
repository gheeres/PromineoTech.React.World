import { useEffect, useState } from "react";
import CountryTable from "../components/CountryTable";
import { getAllCountries } from "../hooks/useWorldService";
import { Country } from "../types";

type CountryProps = {
};

export default function Countries(props: CountryProps) {
  const [ countries, setCountries ] = useState<Country[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getAllCountries();  
      setCountries(response);
    })();
  }, [ ]);

  return(
    <>
      <h1>Countries</h1>
      <CountryTable countries={ countries } />
    </>
  );
}