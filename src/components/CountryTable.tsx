import { Country } from "../types";

type CountryTableProps = {
  countries: Country[]  
};

export default function CountryTable({ countries, ...props }: CountryTableProps) {
  //const countries = props.countries || [];

  const rows = countries.map((country) => {
    return (
      <tr key={ country.code }>
        <td>{ country.code }</td>
        <td>{ country.name }</td>
        <td>{ country.continent }</td>
        <td>{ country.population?.toLocaleString() }</td>
      </tr>
    );
  })

  return(
    <table className="table table-hover">
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
          <td colSpan={ 4 }>{ countries?.length || 0 } countries</td>
        </tr>
      </tfoot>
    </table>
  );
}