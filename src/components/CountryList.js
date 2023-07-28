import { Link } from "react-router-dom"

const TAG = 'CountryList';

export default function CountryList(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const countries = props.countries || [];

  let items = countries.map((country) => {
    return (
      <li key={ country.country_code } className="list-group-item" data-country-code={ country.country_code }>
       <Link to={ `/countries/${ country.country_code }` }>{ country.country_name }</Link> &nbsp; 
       <small className="text-muted">({ country.country_code })</small>
      </li>
    );
  });

  return(
    <ul className="list-group">
      { items }
    </ul>
  );
};