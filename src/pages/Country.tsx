import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { City, Country as CountryType } from "../types";
import CityTable from '../components/CityTable';
import { getCitiesForCountry, getCountryById } from "../hooks/useWorldService";

type CountryProps = {
  country?: CountryType | null | undefined,
  cities?: City[] | undefined,
};

export default function Country(props: CountryProps) {
  const { country_code } = useParams();
  const [ country, setCountry ] = useState<CountryType | null | undefined>(props.country);
  const [ cities, setCities ] = useState<City[] | null | undefined>(props.cities || []);
  
  useEffect(() => {
    (async () => {
      if (country_code) {
        getCountryById(country_code).then((country) => {
          setCountry((_) => country);
        });
        getCitiesForCountry(country_code).then((cities) => {
          setCities((_) => cities);
        })
      }
    })();
  }, [ country_code ]);
  
  console.log(`Country(${ country_code }: ${ country?.name || "Loading..." })`);
  return(
    <>
      <h1>[{ country_code }] { country?.name || "Loading..." }</h1>
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
  );
}