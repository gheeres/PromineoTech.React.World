import { useState, useEffect, useRef } from 'react';
import WorldService from '../services/WorldService';
import CountryTable from "../components/CountryTable";
import withLoading from '../components/withLoading';
import CountryForm from '../components/CountryForm';
import withModal from '../components/withModal';

const service = new WorldService();

const LoadingCountryTable = withLoading(CountryTable);
const ModalCountryForm = withModal(CountryForm);

export default function Countries(props) {
  const [ countries, setCountries ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ modal, setModal ] = useState();

  useEffect(() => {
    //console.log(`Countries.getAllCountries(): Loading Data...`);
    service.getAllCountries().then((data) => {
      setCountries(data);
      setLoading(false);
    });
  }, []);
  
  function handleDelete(code, e) {
    //console.log(`Countries.handleDelete(${ code })`, e);
    if (code) {
      service.deleteCountry(code).then(country => {
        console.log(`Countries.Delete(${ code }):`, country);
        // Can force full refresh / API get,
        // or just update the current state.
        setCountries(countries.filter(c => c.code !== code));
      });
    }
  }

  function handleSave(modal) {
    //console.log(`Countries.handleSave(...)`, modal);
    if (modal) {
      let input = {
        country_code: modal.querySelector('#country_code').value || null,
        country_population: parseInt(modal.querySelector('#country_population').value, 10) || null,
        country_name: modal.querySelector('#country_name').value || null
      };
      console.log(`Countries.Save():`, input);
      // TODO: Make a call to backend service to save / update country information.
      
      return true; // return true to close form, false to keep open.
    }
    return false;
  }

  function handleAdd(e) {
    //console.log(`Countries.handleAdd(...)`, e);
    // To force new object / state change, wrap in <></>
    setModal(<><ModalCountryForm onSave={ handleSave } /></>); 
  }
  
  return(
    <>
      <h2>Countries</h2>
      <LoadingCountryTable loading={ loading } countries={ countries } 
                           onAdd={ handleAdd } onDelete={ handleDelete } />
      { modal }
    </>
  );
}