import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import LanguageSelect from "./LanguageSelect";
import CountrySelect from "./CountrySelect";
import WorldService from "../services/WorldService";

const TAG = 'CountryLanguageForm';
const service = new WorldService();

export default function CountryLanguageForm(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const countries = props.countries || [];
  const languages = props.languages || [];
  const [ existing, setExisting ] = useState({});
  const [ country, setCountry ] = useState(props.country);
  const [ language, setLanguage ] = useState(props.language);

  useEffect(() => {
    props.save = handleSave
  }, []);
  useEffect(() => {
    service.getLangageDetailForCountry(country, language).then((detail) => {
      setExisting(detail);
    });
  }, [ country, language ]);

  function handleCountryChange(country, e) {
    console.debug(`${ TAG }.handleCountryChange(${ country })`);
    if (country) {
      setCountry(country);
      props.enable();
    }
    else {
      props.disable();
    }
  }

  function handleLanguageChange(language, e) {
    console.debug(`${ TAG }.handleLanguageChange(${ language })`);
    if (language) {
      setLanguage(language);
    }
  }

  function handleSave(e) {
    if (props.onSave) {
      let modal = e.target.closest('.modal');
      let input = {
        language_percentage: parseFloat(modal.querySelector('#language_percentage').value) || null,
        is_official: modal.querySelector('#is_official').checked || false
      };
      props.onSave(country, language, input, existing, e).then((result) => {
        handleClose(e);
      });
      return;
    }
  }
  
  return(
    <>
      <div className="mb-3">
        <label htmlFor="languge_code">Language:</label>
        <LanguageSelect id="languge_code" exclude={ languages } disabled={ ((props.language) && (props.language !== '')) } language={ language } onChange={ handleLanguageChange } />
      </div>
      <div className="mb-3">
        <label htmlFor="country_code">Country:</label>
        <CountrySelect id="country_code" exclude={ countries } disabled={ ((props.country) && (props.country !== ''))} country={ country } onChange={ handleCountryChange } />
      </div>
      <div className="mb-3">
        <label htmlFor="language_percentage" className="form-label">Percentage:</label>
        <input type="number" className="form-control" min="0" max="100" step="0.1" id="language_percentage" defaultValue={ existing?.language_percentage } />
      </div>
      <div className="mb-3 form-check">
        <input id="is_official" type="checkbox" className="form-check-input" defaultChecked={ existing?.is_official } />
        <label className="form-check-label" htmlFor="is_official">Is Official</label>
      </div>
    </>
  );
}
