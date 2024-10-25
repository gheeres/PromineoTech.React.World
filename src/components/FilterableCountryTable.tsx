import { useEffect, useId, useState } from "react";
import { getAllCountries } from "../services/CountryService";

import CountryTable from "./CountryTable";
import { Country } from "../type";

type FilterableCountryTableProps = {
  filter?: string,   
  countries?: Country[] | null
};

export default function FilterableCountryTable(props: FilterableCountryTableProps) {
  const countrySearchId = useId();
  const [ filter, setFilter ] = useState(props.filter || '');
  const [ countries, setCountries ] = useState(props.countries || []);

  useEffect(() => {
    (async () => {
      setCountries(await getAllCountries()); 
    })();
  }, [ ]);

  const filterExpression = new RegExp((filter || '').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "gi");   
  const filteredCountries = countries.filter(c => {
    return filterExpression.test(c.code) ||
           filterExpression.test(c.code2) ||
           filterExpression.test(c.name);
  });

  return(
    <>
      <div className="form-floating mb-3">
        <input id={ countrySearchId } onChange={ (e) => setFilter(e.target.value) } 
               className="form-control" placeholder="Enter name of country" 
               value={ filter } />
        <label htmlFor={ countrySearchId }>Country Name</label>
      </div>
      <CountryTable countries={ filteredCountries } autoFetch={ false } />
    </>
  );
}