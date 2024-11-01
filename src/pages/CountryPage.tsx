import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCountryByCode } from "../services/CountryService.ts";
import type { Country } from '../type.ts';
import FilterableCityTable from "../components/FilterableCityTable.tsx";

type CountryPageProps = {
};

export default function CountryPage({ ...props }: CountryPageProps) {
  const { countryCode } = useParams();
  const [ country, setCountry ] = useState<Country>();
  const [ status, setStatus ] = useState('initialize');
  
  useEffect(() => {
    (async () => {
      if (countryCode) {
        setStatus('loading');
        setCountry((await getCountryByCode(countryCode))!);
        setStatus('loaded');
      }
    })();
  }, [ countryCode ]);

  return(
    <>
      <h2>{ country?.name } <small>({ country?.code })</small></h2>
      <div className="row">
        <label className="col-2">Population</label>
        <span className="col-10">{ country?.population?.toLocaleString() }</span>
      </div>

      <ul className="nav nav-tabs mt-3" role="tablist">
        <li className="nav-item">
          <button className="nav-link active" id="cities-tab" data-bs-toggle="tab" data-bs-target="#cities" type="button" role="tab" aria-controls="cities" aria-selected="true">
            Cities
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" id="languages-tab" data-bs-toggle="tab" data-bs-target="#languages" type="button" role="tab" aria-controls="languages" aria-selected="true">
            Languages
          </button>
        </li>        
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="cities" role="tabpanel" aria-labelledby="cities-tab">
          <div className="p-2 pt-4">
            <FilterableCityTable countryCode={ countryCode } />
          </div>
        </div>
        <div className="tab-pane fade" id="languages" role="tabpanel" aria-labelledby="languages-tab">
          Display all the languages
        </div>
      </div>
    </>
  );
}