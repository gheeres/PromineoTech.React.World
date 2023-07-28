import WorldService from "../services/WorldService";

const TAG = 'CountryLanguageTable';
const service = new WorldService();

export default function CountryLanguageTable(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const language = props.language;
  const countries = props.countries || [];

  function handleOnAdd(e) {
    console.debug(`${ TAG }.handleOnAdd(${ language })`);
    if ((language) && (props.onAdd)) {
      props.onAdd(language, countries, e);
    }
  }

  function handleOnDelete(e) {
    const country = e.target.dataset.countryCode;
    if ((country) && (props.onDelete)) {
      console.debug(`${ TAG }.handleOnDelete(${ country })`);
      props.onDelete(country, language, e);
    }
  }

  function handleOnEdit(e) {
    const country = e.target.dataset.countryCode;
    if ((country) && (props.onEdit)) {
      console.debug(`${ TAG }.handleOnEdit(${ country })`);
      service.getLangageDetailForCountry(country, language).then((detail) => {
        props.onEdit(country, language, detail, e);
      });
    }
  }

  const rows = countries.map((country) => {
    return (
      <tr key={ country.country_code } data-country-code={ country.country_code }>
        <td>{ country.country_code }</td>
        <td>{ country.country_name }</td>
        <td className="text-center">{ country.is_official ? <i className="bi bi-check-circle-fill"></i> : '' }</td>
        <td className="text-end">{ country.language_percentage.toFixed(1) || '' }%</td>
        <td className="text-end">
          <i data-country-code={ country.country_code } className="text-primary bi bi-pencil-square" onClick={ handleOnEdit }></i>
          <i data-country-code={ country.country_code } className="text-danger bi bi-trash" onClick={ handleOnDelete }></i>
        </td>        
      </tr>
    );
  });

  return(
    <>
      <table className={ `table table-striped table-hover${ (! countries.length) ? ' d-none' : '' }` }>
       <caption>{ (countries.length) ? countries.length : 'No' } countries</caption>
       <thead>
         <tr>
           <th className="col-2">Code</th>
           <th className="col-5">Country</th>
           <th className="text-center col-1">Official?</th>
           <th className="text-end col-2">Percentage</th>
           <th className="text-end col-1">
             <i className="bi bi-plus-circle-fill fs-4 text-success" onClick={ handleOnAdd }></i>
           </th>
         </tr>
       </thead>
       <tbody>
         { rows }
       </tbody>
      </table>
    </>
  );
}