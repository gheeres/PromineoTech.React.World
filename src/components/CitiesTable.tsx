import { CityModel } from "../types";

type CitiesTableProps = {
  cities?: CityModel[],
}

export default function CitiesTable({ cities, ...props }: CitiesTableProps) {
  let rows = cities?.map((city,index) => {
    return(
      <tr key={ city.id }>
        <td>{ city.name }</td>
        <td>{ city.location?.latitude } / { city.location?.longitude }</td>
        <td>{ city.population?.toLocaleString() }</td>
      </tr>
    );
  })
  return(
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={ 3 }>{ rows?.length || 0 } cities</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}