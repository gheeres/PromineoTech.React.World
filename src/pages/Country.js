import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import WorldService from "../services/WorldService";
import CityTable from '../components/CityTable';
import withLoading from '../components/withLoading.js';

const service = new WorldService();

export default function Country() {
  const { country: country_code } = useParams();
  const [ country, setCountry ] = useState({});
  const [ cities, setCities ] = useState([]);
  const [ isLoadingCities, setIsLoadingCities ] = useState(true);

  useEffect(() => {
    service.getCountry(country_code).then((json) => {
      setCountry(json);
    });
    service.getCitiesForCountry(country_code).then((json) => {
      setCities(json);
      setIsLoadingCities(false);
    });
  }, [ country_code ]);

  const LoadingCityTable = withLoading(CityTable);

  return(
    <>
      <h2>{ country.country_name }</h2>
      <div className="row">
        <label className="col-2">Capital</label>
        <span className="col-auto">{ country.capital?.city_name } </span>
      </div>
      <div className="row">
        <label className="col-2">Population</label>
        <span className="col-auto">{ country.country_population } </span>
      </div>

      <ul className="nav nav-tabs mt-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="cities-tab" data-bs-toggle="tab"
                   data-bs-target="#cities">
            Cities
          </button>    
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="languages-tab" data-bs-toggle="tab"
                   data-bs-target="#languages">
            Languages
          </button>    
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="cities" role="tabpanel">
          <LoadingCityTable loading={ isLoadingCities } cities= { cities }  />
        </div>
        <div className="tab-pane fade" id="languages" role="tabpanel">
          // render for language
        </div>
      </div>
    </>
  );
};