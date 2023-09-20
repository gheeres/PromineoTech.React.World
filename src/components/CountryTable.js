export default function CountryTable(props) {
  const countries = props.countries || [];

  const rows = countries.map((country,index) => {
    return(
      <tr key={ country.code } data-country={ country.code }>
        <td>{ country.code }</td>
        <td>{ country.name }</td>
        <td>{ country.continent }</td>
        <td>{ country.population?.toLocaleString() }</td>
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