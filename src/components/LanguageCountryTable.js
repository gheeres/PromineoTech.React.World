import WorldService from "../services/WorldService";

const TAG = 'LanguageCountryTable';
const service = new WorldService();

export default function LanguageCountryTable(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const country = props.country;
  const languages = props.languages || [];

  function handleOnAdd(e) {
    console.debug(`${ TAG }.handleOnAdd(${ country })`);
    if ((country) && (props.onAdd)) {
      props.onAdd(country, languages, e);
    }
  }

  function handleOnDelete(e) {
    const language = e.target.dataset.languageCode;
    if ((language) && (props.onDelete)) {
      console.debug(`${ TAG }.handleOnDelete(${ language })`);
      props.onDelete(country, language, e);
    }
  }

  function handleOnEdit(e) {
    const language = e.target.dataset.languageCode;
    if ((language) && (props.onEdit)) {
      console.debug(`${ TAG }.handleOnEdit(${ language })`);
      service.getLangageDetailForCountry(country, language).then((detail) => {
        props.onEdit(country, language, detail, e);
      });
    }
  }

  const rows = languages.map((language) => {
    return (
      <tr key={ language.language_code } data-language-code={ language.language_code }>
        <td>{ language.language_code }</td>
        <td>{ language.language_name }</td>
        <td className="text-center">{ language.is_official ? <i className="bi bi-check-circle-fill"></i> : '' }</td>
        <td className="text-end">{ language.language_percentage.toFixed(1) || '' }%</td>
        <td className="text-end">
          <i data-language-code={ language.language_code } className="text-primary bi bi-pencil-square" onClick={ handleOnEdit }></i>
          <i data-language-code={ language.language_code } className="text-danger bi bi-trash" onClick={ handleOnDelete }></i>
        </td>        
      </tr>
    );
  });

  return(
    <>
      <table className={ `table table-striped table-hover${ (! languages.length) ? ' d-none' : '' }` }>
       <caption>{ (languages.length) ? languages.length : 'No' } languages</caption>
       <thead>
         <tr>
           <th className="col-2">Code</th>
           <th className="col-5">Language</th>
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