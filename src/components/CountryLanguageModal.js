import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import LanguageSelect from "./LanguageSelect";
import CountrySelect from "./CountrySelect";
import WorldService from "../services/WorldService";

const TAG = 'CountryLanguageModal';
const service = new WorldService();

export default function CountryLanguageModal(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const countries = props.countries || [];
  const languages = props.languages || [];
  const [ existing, setExisting ] = useState({});
  const [ country, setCountry ] = useState(props.country);
  const [ language, setLanguage ] = useState(props.language);
  const [ modal, setModal ] = useState(false);
  const modalRef = useRef(); 
  const title = props.title || 'Add Detail';

  useEffect(() => {
    const modal = new Modal(modalRef.current, { keyboard: false });
    setModal(modal);
    modal.show();
  }, []);

  useEffect(() => {
    service.getLangageDetailForCountry(country, language).then((detail) => {
      setExisting(detail);
    });
  }, [ country, language ]);

  function handleClose(e) {
    modal.hide();
    if (props.onClose) {
      props.onClose(modalRef);
    }
  }

  function handleCountryChange(country, e) {
    console.debug(`${ TAG }.handleCountryChange(${ country })`);
    if (country) {
      setCountry(country);
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
    handleClose(e);
  }
  
  return(
    <div className="py-2">
      <div className="modal" tabIndex="-1" ref={ modalRef }>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{ title }</h5>
              <button type="button" className="btn-close" onClick={ handleClose } data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
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
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={ handleClose } type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Cancel">
                Cancel
              </button>
              <button onClick={ handleSave } type="button" className="btn btn-primary btn-save" disabled={ country ? '' : 'disabled' }>
                Save &nbsp; <i className="bi bi-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
