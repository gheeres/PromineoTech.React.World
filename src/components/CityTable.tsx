import { City } from "../types";

type CityTableProps = {
  cities?: City[]
};

export default function CityTable({ cities, ...props }: CityTableProps) {
  const rows = cities?.map((city,index) => {
    return(
     <tr key={ city.id }>
       <td>{ city.name }</td>
       <td>{ city.location?.latitude } / { city.location?.longitude }</td>
       <td>{ city.population?.toLocaleString() }</td>
     </tr>
    );
  });

  return (
    <>
      <table className="table table-striped table-hover table-condense">
        <thead>
          <tr>
            <td>Name</td>
            <td>Location</td>
            <td>Population</td>
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
    </>
  );
}