import CountryTable from "../components/CountryTable.js";

export default function Countries(props) {
  const countries = props.countries || [];
  
  return(
    <>
      <h2>Countries</h2>
      <CountryTable countries={ countries } />
    </>
  );
}