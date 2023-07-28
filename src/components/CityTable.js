import WorldService from "../services/WorldService";

const TAG = 'CityTable';
const service = new WorldService();

export default function CityTable(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const country = props.country;
  const cities = props.cities || [];
  
  function handleOnAdd(e) {
    console.debug(`${ TAG }.handleOnAdd(${ country })`);
    if ((country) && (props.onAdd)) {
      props.onAdd(country, cities, e);
    }
  }

  function handleOnDelete(e) {
    const city_id = parseInt(e.target.dataset.cityId, 10);
    if ((city_id) && (props.onDelete)) {
      console.debug(`${ TAG }.handleOnDelete(${ city_id })`);
      props.onDelete(city_id, e);
    }
  }

  function handleOnEdit(e) {
    const city_id = parseInt(e.target.dataset.cityId, 10);
    if ((city_id) && (props.onEdit)) {
      console.debug(`${ TAG }.handleOnEdit(${ city_id })`);
      service.getCity(city_id).then((city) => {
        props.onEdit(city_id, city, e);
      });
    }
  }

  const rows = cities.map((city) => {
    return (
      <tr key={ city.city_id } data-city-id={ city.city_id }>
        <td>{ city.city_name }</td>
        <td>{ city.latitude }</td>
        <td>{ city.longitude }</td>
        <td className="text-end">{ city.city_population?.toLocaleString() || '' }</td>
        <td className="text-end">
          <i data-city-id={ city.city_id } className="text-primary bi bi-pencil-square" onClick={ handleOnEdit }></i>
          <i data-city-id={ city.city_id } className="text-danger bi bi-trash" onClick={ handleOnDelete }></i>
        </td>        
      </tr>
    );
  });

  return(
    <>
      <table className={ `table table-striped table-hover${ (! cities.length) ? ' d-none' : '' }` }>
       <caption>{ (cities.length) ? cities.length : 'No' } cities</caption>
       <thead>
         <tr>
           <th className="col-5">Name</th>
           <th className="col-2">Latitude</th>
           <th className="col-2">Longitude</th>
           <th className="text-end col-2">Population</th>
           <th className="text-end col-1">
             <i className="bi bi-plus-circle-fill fs-4 text-success" onClick={ handleOnAdd }></i>
           </th>
        </tr>
       </thead>
       <tbody>
         { rows }
       </tbody>
      </table>
    </>
  );
}