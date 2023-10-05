export default function CityTable(props) {
  const country = props.country; 
  const cities = props.cities || [];

  let rows = cities.map((city) => {
    return(
      <tr key={ city.id } data-city-id={ city.id }>
        <td>{ city.name }</td>
        <td>{ city.latitude }</td>
        <td>{ city.longitude }</td>
        <td>{ city.population?.toLocaleString() }</td>
      </tr>
    );
  });

  return(
    <table className="table table-stripped table-hover">
      <thead>
        <tr>
          <th>Name</th>  
          <th>Latitude</th>  
          <th>Longitude</th>  
          <th>Population</th>  
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </table>
  );   
}