import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LanguageCountryTable from '../components/LanguageCountryTable';
import CountryLanguageModal from '../components/CountryLanguageModal';
import WorldService from '../services/WorldService';
import CityTable from '../components/CityTable';
import withLoading from '../components/withLoading';

const TAG = 'Country';
const service = new WorldService();

export default function Country(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const [ isLoadingCities, setIsLoadingCities ] = useState(true);
  const [ isLoadingLanguages, setIsLoadingLanguages ] = useState(true);
  const { country: country_code } = useParams();
  const [ country, setCountry ] = useState({});
  const [ languages, setLanguages ] = useState([]);
  const [ cities, setCities ] = useState([]);
  const [ forced, updateState ] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [ modal, setModal ] = useState();

  useEffect(() => {
    service.getCountry(country_code).then((country) => {
      setCountry(country);
    });
  }, [ country_code ]);
  useEffect(() => {
    service.getLanguagesSpokenInCountry(country.country_code).then((languages) => {
      setLanguages(languages);
      setTimeout(() => {
        setIsLoadingLanguages(false);  
      }, 6000);
    });
    service.getCitiesForCountry(country.country_code).then((cities) => {
      setCities(cities);
      setTimeout(() => {
        setIsLoadingCities(false);
      }, 3000);
    });
  }, [ country, forced ]);

  function handleLanguageDelete(country, language, e) {
    console.debug(`${ TAG }.handleLanguageDelete(${ JSON.stringify(country) },${ JSON.stringify(language) })`);
    service.deleteLanguageDetailFromCountry(country, language).then((response) => {
      forceUpdate();
    });
  }
  function handleLanguageEdit(country, language, detail, e) {
    console.debug(`${ TAG }.handleLanguageEdit(${ JSON.stringify(country) },${ JSON.stringify(language) },${ JSON.stringify(detail) })`);
    setModal(<CountryLanguageModal language={ language } country={ country }
                                   languages={ languages.map((l) => l.language_code) }
                                   onSave={ handleLanguageModalSave }
                                   onClose={ handleModalClose } />);
  }
  function handleLanguageAdd(country, languages, e) {
    console.debug(`${ TAG }.handleCountryAdd(${ JSON.stringify(country) },${ JSON.stringify(languages) })`);
    setModal(<CountryLanguageModal language={ '' } country={ country }
                                   languages={ languages.map((l) => l.language_code) }
                                   onSave={ handleLanguageModalSave }
                                   onClose={ handleModalClose } />);
  }
  
  function handleLanguageModalSave(country, language, input, original, e) {
    if (original?.language_code === language) {
      return service.updateLanguageDetailForCountry(country, language, input).then((res) => {
        forceUpdate();
        return true; 
      });
    }
    else {
      return service.addLanguageDetailForCountry(country, { ...input, language_code: language }).then((res) => {
        forceUpdate();
        return true;
      });
    }
  }

  function handleCityDelete(city_id, e) {
    console.log(`${ TAG }.handleCityDelete(${ JSON.stringify(city_id) })`);
  }
  function handleCityEdit(city_id, city, e) {
    console.log(`${ TAG }.handleLanguageEdit(${ JSON.stringify(city_id) },${ JSON.stringify(city) })`);
  }
  function handleCityAdd(country, cities, e) {
    console.log(`${ TAG }.handleCityAdd(${ JSON.stringify(country) },${ JSON.stringify(cities) })`);
  }

  function handleModalClose(e) {
    console.debug(`${ TAG }.handleModalClose(${ e?.target })`);
    setModal();
  }

  const LoadingCityTable = withLoading(CityTable);
  const LoadingLanguageCountryTable = withLoading(LanguageCountryTable);
  return (
    <>
      <h2>{ country.country_name } <small>({ country.country_code })</small></h2>
      <div className="row">
        <label className="col-1">Capital</label>
        <span className="col-auto">{ country.capital?.city_name }</span>
      </div>
      <div className="row">
        <label className="col-1">Population</label>
        <span className="col-auto">{ country.country_population?.toLocaleString() }</span>
      </div>
      
      <ul className="nav nav-tabs mt-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="cities-tab" data-bs-toggle="tab" data-bs-target="#cities" type="button" role="tab" aria-controls="cities" aria-selected="true">
            Cities
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="languages-tab" data-bs-toggle="tab" data-bs-target="#languages" type="button" role="tab" aria-controls="languages" aria-selected="false">
          Languages
          </button>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="cities" role="tabpanel" aria-labelledby="cities-tab">
          <LoadingCityTable loading={ isLoadingCities } 
                            country={ country?.country_code } cities={ cities }
                            onDelete={ handleCityDelete } onEdit={ handleCityEdit }
                            onAdd={ handleCityAdd } />
        </div>
        <div className="tab-pane fade" id="languages" role="tabpanel" aria-labelledby="languages-tab">
          <LoadingLanguageCountryTable loading={ isLoadingLanguages } 
                                       country={ country?.country_code } languages={ languages }
                                       onDelete={ handleLanguageDelete } onEdit={ handleLanguageEdit }
                                       onAdd={ handleLanguageAdd } />
        </div>
      </div>
      { modal }   
    </>
  );
}