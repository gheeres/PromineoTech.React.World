export default function CityTable(props) {
  let cities = props.cities || [];

  let rows = cities.map((city,index) => {
    return (
      <tr key={ city.city_id }>
        <td>{ city.city_name }</td>
        <td>{ city.latitude }, { city.longitude }</td>
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