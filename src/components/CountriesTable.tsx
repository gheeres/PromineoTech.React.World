import { Link } from "react-router";
import { CountryModel } from "../types";
import CountrySearchBar from "./CountrySearchBar";
import { useState } from "react";

type CountriesTableProps = {
  countries?: CountryModel[]
};

export default function CountriesTable({ countries, ...props }: CountriesTableProps) {
  const [ filter, setFilter ] = useState<string>('');
  const [ sort, setSort ] = useState<string>('name');
  
  function handleCountryNameSearch(name: string, e: React.ChangeEvent) {
    console.log(`CountriesTable.handleCountryNameSearch(${ name })`);
    setFilter((_) => name);
  }
  function handleCountrySort(sortOption: string, e: React.ChangeEvent) {
    console.log(`CountriesTable.handleCountrySort(${ sortOption })`);
    setSort((_) => sortOption);
  }

  if (filter) {
    //let filterToLowerCase = filter.toLowerCase();
    //countries = countries?.filter(c => c.name.toLowerCase().includes(filterToLowerCase));
    let filterRegex = new RegExp(`${filter}`, 'i');
    countries = countries?.filter(c => filterRegex.test(c.name));
  }
  if (sort) {
    if (sort === 'population') {
      countries = countries?.sort((country1, country2) => (country1.population || 0) - (country2.population || 0));
    }
    else {
      countries = countries?.sort((country1, country2) => country1.name.localeCompare(country2.name));
    }
    // countries = countries?.sort((country1,country2) => country1[sort]?.toString().localeCompare( country2[sort]?.toString()) )
  } 

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
    <>
      <CountrySearchBar onNameSearch={ handleCountryNameSearch } onSort={ handleCountrySort } />
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
    </>
  )
}