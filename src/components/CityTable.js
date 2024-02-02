export default function CityTable(props) {
  let cities = props.cities || [];
  const rows = cities.map((city) => {
    return (
      <tr key={ city.city_id }>
        <td>{ city.city_name }</td>
        <td>{ city.city_population }</td>
        <td>{ city.latitude }, { city.longitude }</td>
      </tr>  
    );
  });

  return(
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Population</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </table>
  ); 
}