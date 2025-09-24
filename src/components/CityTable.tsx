import { City } from "../types";
import GeoLocation from "./GeoLocation";

type CityTableProps = {
  cities: City[] | null
};

export default function CityTable({ cities, ...props }: CityTableProps) {
  const rows = cities?.map((city) => {
    return (
      <tr key={ city.id }>
        <td>{ city.name }</td>
        <td><GeoLocation location={ city.location } /></td>
        <td>{ city.population?.toLocaleString() }</td>
      </tr>
    );
  }) || [];

  console.log("CityTable()");
  return(
    <table className="table table-hover">
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
          <td colSpan={ 3 }>{ cities?.length || 0 } cities</td>
        </tr>
      </tfoot>
    </table>
  ); 
}