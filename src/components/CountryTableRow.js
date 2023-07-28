import react from 'react';

export default function CountryTableRow(props) {
  let country = props.country;
  return (
    <tr key={ country.country_code }>
      <td>{ country.country_code }</td>
      <td><a href={ `/countries/${ country.country_code }` }>{ country.country_name }</a></td>
    </tr>
  );
}

/*
//
// Below is the equivalent Class based React component.
//
export class CountryTableRowComponent extends react.Component {
  contructor(props) {
  }

  render() {
    let country = this.props.country;

    return (
      <tr key={ country.country_code }>
        <td>{ country.country_code }</td>
        <td>{ country.country_name }</td>
      </tr>
      );
  }
}
*/