import { useEffect, useId, useState } from "react";
import { getAllCitiesForCountry } from "../services/CityService";

import CityTable from "./CityTable";
import { City } from "../type";
import withLoading from "./withLoading";

type FilterableCityTableProps = {
  countryCode?: string,
  filter?: string,   
  cities?: City[] | null,
};

export default function FilterableCityTable({ countryCode, ...props }: FilterableCityTableProps) {
  const citySearchId = useId();
  const [ filter, setFilter ] = useState(props.filter || '');
  const [ cities, setCities ] = useState<City[]>(props.cities || []);
  const [ status, setStatus ] = useState('initialize');

  useEffect(() => {
    (async () => {
      if (countryCode) {
        setStatus('loading');
        setCities(await getAllCitiesForCountry(countryCode!)); 
        setStatus('loaded');
      }
    })();
  }, [ countryCode ]);

  const filterExpression = new RegExp((filter || '').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "gi");   
  const filteredCities = cities.filter(c => {
    return filterExpression.test(c?.name);
  });

  const LoadingCityTable = withLoading(CityTable);
  return(
    <>
      <div className="form-floating mb-3">
        <input id={ citySearchId } onChange={ (e) => setFilter(e.target.value) } 
               className="form-control" placeholder="Enter name of city" 
               value={ filter } />
        <label htmlFor={ citySearchId }>City Name</label>
      </div>
      <LoadingCityTable isLoading={ status === 'loading' } cities={ filteredCities } autoFetch={ false } />
    </>
  );
}