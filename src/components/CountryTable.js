
import { useState, useEffect } from 'react';
import CountryTableRow from './CountryTableRow';

const baseUrl = `http://localhost:3000`;

export default function CountryTable(props) {
  //const [ a, b ] = [ 1, 2, 3, 4 ];
  const [ countries, setCountries ] = useState( [] );
  useEffect(() => {
    //let countries = [];
    let url = `${ baseUrl }/countries`;
    fetch(url).then(res => res.json()).then(data => {
      //console.log(data);
      setCountries(data);
    });
  }, [ ]);

  let rows = countries.map((country,index) => {
    return(
      <CountryTableRow key={ country.country_code } country={ country } />
    );
  });
  return (
    <table style={ { border: 'solid 1px #000', width: '100%' } }>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
        </tr>  
      </thead>
      <tbody>
        { rows }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">0 countries</td>  
        </tr>
      </tfoot>
    </table>
  ); 
}