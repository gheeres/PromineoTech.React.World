import { Link } from "react-router";
import { CountryModel } from "../types";

type CountriesTableProps = {
  countries?: CountryModel[]
};

export default function CountriesTable({ countries, ...props }: CountriesTableProps) {

  let totalPopulation = 0;
  const rows = countries?.map((country) => {
    totalPopulation += country?.population || 0;
    return(
      <tr key={ country.code }>
        <td>{ country.code }</td>
        <td><Link to={ `/countries/${country.code}` }>{ country.name }</Link></td>
        <td>{ country.continent }</td>
        <td className="text-end">{ country.population?.toLocaleString() }</td>
      </tr>
    );
  });

  return(
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Continent</th>
          <th>Population</th>
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
          <td className="text-end">
            { totalPopulation.toLocaleString() } 
          </td>
        </tr>
      </tfoot>
    </table>
  )
}