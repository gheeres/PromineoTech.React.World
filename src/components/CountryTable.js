import { Link } from 'react-router-dom';

export default function CountryTable(props) {
  const countries = props.countries || [];

  const rows = countries.map((country) => {
    return (
      <tr key={ country.code }>
        <td>{ country.code }</td>  
        <td><Link to={ `/countries/${ country.code }` }>{ country.name }</Link></td>  
        <td>{ country.population?.toLocaleString() }</td>  
      </tr>
    );
  });
  
  return(
   <table className="table table-striped table-hover">
     <thead>
       <tr>
         <th>Code</th>
         <th>Name</th>
         <th>Population</th>
       </tr>
     </thead>
     <tbody>
       { rows }
     </tbody>
   </table>
  );
}