import { getCountryById } from "../hooks/useWorldService";
import { Country } from "../types";

type CountryDropDownProps = {
  countries: Country[],
  onCountryChanged: (country: Country,e: React.ChangeEvent<HTMLSelectElement>) => void,
};

export default function CountryDropDown({ countries, ...props }: CountryDropDownProps) {
  const options = countries.map((country) => {
    return(
      <option key={ country.code } value={ country.code }>{ country.name }</option>
    )
  });  

  async function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (props?.onCountryChanged) {
      const countryCode = e.target.value;
      if (countryCode) {
        const country = await getCountryById(countryCode);
        if (country) {
          props.onCountryChanged(country, e);  
        }
      } 
    }
  }

  return(
    <select className="form-select" onChange={ handleOnChange }>
        { options }
    </select>
  ); 
}