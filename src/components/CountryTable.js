import React from 'react';

class CountryTableClass extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {
    const items = this.props.countries.map((country) => {
      return (
        <tr key={ country.country_code }>
          <td>{ country.country_code }</td>  
          <td>{ country.country_name }</td>  
          <td>{ country.country_population }</td>  
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
          { items }
        </tbody>
      </table>
    );
  }
}

export default function CountryTable(props) {
  const items = props.countries.map((country) => {
    return (
      <tr key={ country.country_code }>
        <td>{ country.country_code }</td>  
        <td>{ country.country_name }</td>  
        <td>{ country.country_population }</td>  
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
       { items }
     </tbody>
   </table>
  );
}