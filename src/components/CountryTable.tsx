import { Country } from '../types';
import { useEffect, useState } from "react";
import { getAllCountries } from "../services/CountryService";

export default function CountryTable() {
  const [ countries, setCountries ] = useState<Country[] | null>([]);
  useEffect(() => {
    (async () => {
      let countries = await getAllCountries();
      setCountries(countries);
    })();
  }, [ ]);

  let rows = countries?.map((country,index) => {
    return(
     <tr key={ country?.code || index }>
       <td>{ country?.code }</td>
       <td>{ country?.name } </td>
       <td>{ country?.population?.toLocaleString() }</td>
     </tr>   
    )
  });

  return(
    <table className="table table-striped table-hover table-condensed">
      <thead>
        <tr>
          <td>Code</td>
          <td>Name</td>
          <td>Population</td>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={ 3 }>
            { countries?.length || 0 } countries
          </td>
        </tr>
      </tfoot>
    </table>
  ); 
}