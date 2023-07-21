
import { useState, useEffect } from 'react';
import CountryTableRow from './CountryTableRow';

export default function CountryTable(props) {
  let countries = props.countries || [];

  let rows = countries.map((country,index) => {
    return(
      <CountryTableRow key={ country.country_code } country={ country } />
    );
  });
  return (
    <table className="table table-striped table-hover mt-2">
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