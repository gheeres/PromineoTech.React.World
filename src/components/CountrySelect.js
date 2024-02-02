export default function CountrySelect(props) {
  const currentCountry = props.country;
  const countries = props.countries || [];
  const options = countries.map((country) => {
    return(
      <option key={ country.country_code } value={ country.country_code }>
        { country.country_name }
      </option>
    );
  });

  function handleChange(e) {
    console.log('CountrySelect.handleChange()', e);
    if (props.onSelected) {
      props.onSelected(e.target.value, e);
    }
  }

  return(
    <select className="form-select" defaultValue={ currentCountry } onChange={ handleChange }>
      <option>Select a country.</option>
      { options }
    </select>
  ); 
}