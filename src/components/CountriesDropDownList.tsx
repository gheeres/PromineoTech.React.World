import { useId } from "react";
import { CountryModel } from "../types";

type CountriesDropDownListProps = {
  countries?: CountryModel[],
  onCountryChange?: (e: React.ChangeEvent) => void,
};

export default function CountriesDropDownList({ countries, onCountryChange, ...props }: CountriesDropDownListProps ) {
  let id = useId();
  
  let options = countries?.map((country,index) => {
    return (
      <option key={ country.code } value={ country.code }>{ country.name }</option>
    )
  })
  return(
    <>
      <select id={ `${id}-country-select` } onChange={ (e) => (onCountryChange) ? onCountryChange(e) : null } className="form-select">
        { options }
      </select>
    </>
  );
}