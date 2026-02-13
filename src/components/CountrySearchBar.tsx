import { useId } from "react";

type CountrySearchBarProps = {
  onNameSearch?: (name: string, e: React.ChangeEvent) => void,
  onSort?: (sort: string, e: React.ChangeEvent) => void,
};

export default function CountrySearchBar({ onNameSearch, onSort, ...props}: CountrySearchBarProps) {
  let id = useId();
  
  function handleCountryNameChange(e: React.ChangeEvent) {
    let search = e.target.value;
    if (onNameSearch) {
      onNameSearch(search, e);
    }
  }

  function handleSortChange(e: React.ChangeEvent) {
    let sort = e.target.value;
    if (sort) {
      if (onSort) {
        onSort(sort, e);
      }
    }
  }

  return(
    <>
      <div className="row g-3 align-items-center">
        <div className="col-1">
          <label htmlFor={ `${id}-name-search` } className="col-form-label">Search</label>
        </div>
        <div className="col-8">
          <input type="text" id={ `${id}-name-search` } onChange={ handleCountryNameChange } className="form-control" />
        </div>

        <div className="col-1">
          <label htmlFor={ `${id}-country-sort` } className="col-form-label">Sort</label>
        </div>
        <div className="col-2">
          <select id={ `${id}-country-sort` } onChange={ handleSortChange } defaultValue={ "name" } className="form-select">
            <option value="name">Name</option>
            <option value="population">Population</option>
          </select>
        </div>
      </div>
    </>
  );
}