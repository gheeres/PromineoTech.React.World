import { useEffect, useState } from "react";
import { getAllCountries } from "../services/CountryService";
import { Country } from "../type";
import { Link } from "react-router-dom";
import Loading from "./Loading";

type CountryTableProps = {
  autoFetch?: boolean,  
  countries?: Country[] | null  
};

export default function CountryTable({ autoFetch, ...props } : CountryTableProps) {
  const [ countries, setCountries ] = useState(props.countries || []);
  const [ status, setStatus ] = useState('initialize');

  useEffect(() => {
   (async () => {
     setStatus('loading');
     setCountries(((autoFetch === undefined) || (autoFetch))
                  ? (await getAllCountries())
                  : props.countries || []);
     setStatus('loaded');
   })();
  }, [ props.countries ]);

  const rows = (status === 'loading') 
    ? <Loading />
    : countries.map(country => (
        <tr key={ country?.code }>
          <td>{ country?.code }</td>  
          <td><Link to={ `/countries/${ country.code }`} >{ country?.name }</Link></td>  
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
  );1
}