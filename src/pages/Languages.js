import CountrySelect from '../components/CountrySelect.js';

export default function Languages(props) {
  let countries = props.countries || [];

  function handleCountryChanged(country, e) {
    console.log(`Country Changed: ${ country }`);
  }

  console.log(`Languages.render(${ JSON.stringify(props) })`);
  return(
    <>
      <h2>Languages</h2>
      <CountrySelect id="country" countries={ countries } onChange={ handleCountryChanged } />
    </>
  )
}