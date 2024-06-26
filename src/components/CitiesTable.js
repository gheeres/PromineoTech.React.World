import { Link } from "react-router-dom";

export default function CitiesTable(props) {
  console.log(`CitiesTable.render()`);
  let cities = props.cities || [];

  function handleDelete(e) {
    console.log(`CitiesTable.handleDelete()`, e);
    if (props.onDelete) {
      let row = e.target.closest('tr');
      if (row) {
        let city = row.dataset.city;
        if (city) {
          props.onDelete(city, e);
        }
      }
    }
  }

  let rows = cities.map((city,index) => {
    return (
      <tr key={ city.city_id } data-city={ city.city_id }>
        <td><Link to={ `/cities/${ city.city_id }` }>{ city.city_name }</Link></td>
        <td>{ city.city_population.toLocaleString() }</td>
        <td>{ city.latitude }, { city.longitude }</td>
        <td><i className="bi bi-trash-fill text-danger" onClick={ handleDelete }></i></td>
      </tr>
    );
  });

  return (
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Population</th>
          <th>Location</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4">{ cities.length } cities</td>
        </tr>
      </tfoot>
    </table>
  );
}