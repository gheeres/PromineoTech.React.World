import { getCountryById } from "../services/CountryService";
import { Country } from "../types";

type CountryDropDownProps = {
  countries?: Country[],
  onCountrySelected?: (country: Country | null, e: React.ChangeEvent<HTMLSelectElement>) => void
};

export default function CountryDropDown({ countries, onCountrySelected, ...props }: CountryDropDownProps) {
  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    if (code) {
      if (onCountrySelected) {
        const country = await getCountryById(code);
        onCountrySelected(country, e);
      }
    }
  }

  const options = countries?.map((country) => {
    return(
      <option key={ country.code } value={ country.code }>{ country.name }</option>
    );
  })
  return(
    <>
      <select className="form-select" onChange={ handleChange }>
        { options }
      </select>
    </>
  );
}