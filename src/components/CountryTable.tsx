import { Link } from "react-router-dom";
import { Country } from "../types";

type CountryTableProps = {
  countries?: Country[]
};

export default function CountryTable({ countries, ...props }: CountryTableProps) {
  const rows = countries?.map((country,index) => {
    return(
     <tr key={ country.code }>
      <td>{ country.code }</td>
      <td><Link to={ `/countries/${ country.code }` }>{ country.name }</Link></td>
      <td>{ country.population?.toLocaleString() }</td>
     </tr>
    );
  });

  return (
    <>
      <table className="table table-striped table-hover table-condense">
        <thead>
          <tr>
            <td>Code</td>
            <td>Name</td>
            <td>Populuation</td>
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