import { Link } from "react-router-dom";

export default function CountryTable(props) {
  const countries = props.countries || [];

  const rows = countries.map((country,index) => {
    return(
      <tr key={ country.code } data-country={ country.code }>
        <td>{ country.code }</td>
        <td><Link to={ `/countries/${ country.code }` } >{ country.name }</Link></td>
        <td>{ country.continent }</td>
        <td>{ country.population?.toLocaleString() }</td>
        <td><i className="text-danger bi bi-trash" onClick={ handleOnDelete }></i></td>
      </tr>
    );
  });

  function handleOnAdd(e) {
    if (props.onAdd) {
      props.onAdd(e);
    }
  }

  function handleOnDelete(e) {
    let code = e.target.closest('tr').dataset.country;
    if (code) {
      if (props.onDelete) {
        props.onDelete(code, e);
      }
    }
  }

  return(
    <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th>Code</th>
        <th>Name</th>
        <th>Continent</th>
        <th>Population</th>
        <th><i className="bi bi-plus-circle fs-4 text-success" onClick={ handleOnAdd } ></i></th>
      </tr>  
    </thead>
    <tbody>
      { (rows.length > 0) 
          ? rows
          : <tr><td colSpan="4">No countries.</td></tr>
      }
    </tbody>
    { (rows.length > 0) 
      ? <tfoot>
          <tr><td colSpan="4">{ rows.length } countries</td></tr>
        </tfoot>
      : null  
    }
    </table>
  );
}