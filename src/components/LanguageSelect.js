import { useEffect, useState } from "react";
import WorldService from "../services/WorldService";

const TAG = 'LanguageSelect';
const service = new WorldService();

export default function LanguageSelect(props) {
  console.debug(`${ TAG }.ctor(${ JSON.stringify(props) })`);
  const language = props.language;
  const disabled = props.disabled || false;
  const [ languages, setLanguages ] = useState(props.languages || []);

  useEffect(() => {
    const exclude = props.exclude || [];
    service.getLanguages().then((languages) => {
      setLanguages(languages.filter((l) => (l.language_code === language) || (! exclude.includes(l.language_code))));
    });
  }, [ props.exclude, language ]);

  function handleOnChange(e) {
    const language = e.target.value;
    console.debug(`${ TAG }.handleOnChange(${ language })`);
    if (props.onChange) {
      props.onChange(language, e);
    }
  }

  const options = languages.map((language) => {
    return <option key={ language.language_code } value={ language.language_code }>
             { language.language_name }
           </option>;
  });

  return (
    <select id={ props.id } className="form-select mt-2$" disabled={ disabled } aria-label="Select language" 
            onChange={ handleOnChange } value={ language }>
      <option value="">Select language</option>
      { options }
    </select>
  );
};