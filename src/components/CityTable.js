export default function CityTable(props) {
  let cities = props.cities || [];
  const rows = cities.map((city) => {
    return (
      <tr key={ city.id }>
        <td>{ city.name }</td>
        <td>{ city.population?.toLocaleString() }</td>
        <td>{ city.location.latitude }, { city.location.longitude }</td>
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