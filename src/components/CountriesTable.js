export default function CountriesTable(props) {
  console.log(`CountriesTable.render()`);
  let countries = props.countries || [];

  function handleDelete(e) {
    console.log(`CountriesTable.handleDelete()`, e);
    if (props.onDelete) {
      let row = e.target.closest('tr');
      if (row) {
        let country = row.dataset.country;
        if (country) {
          props.onDelete(country, e);
        }
      }
    }
  }

  let rows = countries.map((country,index) => {
    return (
      <tr key={ country.country_code } data-country={ country.country_code }>
        <td>{ country.country_code }</td>
        <td>{ country.country_name }</td>
        <td>{ country.continent }</td>
        <td>{ country.country_population.toLocaleString() }</td>
        <td><i className="bi bi-trash-fill text-danger" onClick={ handleDelete }></i></td>
      </tr>
    );
  });

  return (
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Continent</th>
          <th>Population</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5">{ countries.length } countries</td>
        </tr>
      </tfoot>
    </table>
  );
}