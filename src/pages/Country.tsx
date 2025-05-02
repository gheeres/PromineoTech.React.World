import { useParams } from "react-router-dom";
import { City, Country as CountryType } from "../types"
import { useEffect, useState } from "react";
import { getCountryById } from "../services/CountryService";
import CityTable from "../components/CityTable";
import { getAllCitiesForCountry } from "../services/CityService";

type CountryProps = {
  country?: CountryType | null | undefined,
};

export default function Country(props: CountryProps) {
  const { country: country_code } = useParams();
  const [ country, setCountry ] = useState<CountryType | null | undefined>(props.country);
  const [ cities, setCities ] = useState<City[]>([]);

  useEffect(() => {
    (async () => {
      let country = await getCountryById(country_code || '');
      setCountry(country);
      if (country) {
        let cities = await getAllCitiesForCountry(country.code);
        setCities(cities);
      }
    })();
  }, [ country_code ]);

  return(
    <>
      <h1>{ country?.name } ({ country?.code })</h1>
      <p>Population: { country?.population?.toLocaleString() }</p>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#" 
             id="city-tab" data-bs-toggle="tab" data-bs-target="#cities">Cities</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" 
             id="language-tab" data-bs-toggle="tab" data-bs-target="#languages">Languages</a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="cities" role="tabpanel" aria-labelledby="city-tab">
          <CityTable cities={ cities } />
        </div>
        <div className="tab-pane fade" id="languages" role="tabpanel" aria-labelledby="languages-tab">
          <p>Languages</p>
        </div>
      </div>
    </>
  )  
}