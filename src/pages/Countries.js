import CountryTable from '../components/CountryTable.js';

export default function Countries(props) {
  let countries = props.countries || [];
  
  console.log(`Countries.render(${ JSON.stringify(props) })`);
  return(
    <>
      <h2>Countries</h2>
      <CountryTable countries={ countries } />
    </>
  )
}