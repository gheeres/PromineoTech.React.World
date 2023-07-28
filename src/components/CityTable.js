export default function CityTable(props) {
  let cities = props.cities || [];

  let rows = cities.map((city,index) => {
    return (
      <tr key={ city.id }>
        <td>{ city.name }</td>
        <td>{ city.location?.latitude }, { city.location?.longitude }</td>
        <td>{ city.population } </td>
      </tr>
    );
  });
  return(
    <table className="table table-striped table-hover mt-2">
      <thead>
        <tr>
          <th>Name</th>
          <th>Lat/Long</th>
          <th>Population</th>
        </tr>  
      </thead>
      <tbody>
        { rows }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">{ rows.length } cities</td>  
        </tr>
      </tfoot>
    </table>
  );
}