import { useEffect, useState } from "react";
import { getAllCountries } from "../services/CountryService";
import { Country } from "../type";

type CountryTableProps = {
  autoFetch?: boolean,  
  countries?: Country[] | null  
};

export default function CountryTable({ autoFetch, ...props } : CountryTableProps) {
  const [ countries, setCountries ] = useState(props.countries || []);

  useEffect(() => {
   (async () => {
      setCountries(((autoFetch === undefined) || (autoFetch))
                   ? (await getAllCountries())
                   : props.countries || []);
   })();
  }, [ props.countries ]);

  const rows = countries.map(country => (
    <tr key={ country?.code }>
      <td>{ country?.code }</td>  
      <td>{ country?.name }</td>  
      <td>{ country?.population?.toLocaleString() }</td>  
    </tr>
  ));

  return(
    <>
      <table className="table table-striped table-hover table-condensed">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
        <tfoot>
          <tr>
           <td colSpan={ 3 }>{ countries?.length || 0 } countries</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}