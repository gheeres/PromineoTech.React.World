import react from 'react';

export default function CountryTableRow(props) {
  let country = props.country;
  return (
    <tr key={ country.country_code }>
      <td>{ country.country_code }</td>
      <td>{ country.country_name }</td>
    </tr>
  );
}


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