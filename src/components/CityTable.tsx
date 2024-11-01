import { useEffect, useState } from "react";
import { City } from "../type";
import { getAllCitiesForCountry } from "../services/CityService";
import Loading from "./Loading";

type CityTableProps = {
  autoFetch? : boolean, 
  countryCode? : string,
  cities?: City[] | null  
};

export default function CityTable({ autoFetch, countryCode, ...props }: CityTableProps) {
  const [ cities, setCities ] = useState<City[]>(props.cities || []);
  const [ status, setStatus ] = useState('initialize');

  useEffect(() => {
    (async () => {
      setStatus('loading');
      setCities(((autoFetch === undefined) || (autoFetch))
                 ? (await getAllCitiesForCountry(countryCode!))
                 : props.cities || []);
      setStatus('loaded');
    })();
  }, [ countryCode, props.cities ]);

  const rows = (status === 'loading') 
    ? <Loading />
    : cities.map(city => (
        <tr data-city={ city.id } key={ city.id }>
          <td>{ city.name }</td>
          <td>{ city.location?.latitude }, { city.location?.longitude }</td>
          <td>{ city.population?.toLocaleString() }</td>
        </tr>   
      ));

  return(
    <>
      <table className="table table-striped table-hover table-condensed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
        <tfoot>
          <tr>
           <td colSpan={ 3 }>{ cities?.length || 0 } cities</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}