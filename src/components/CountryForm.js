
export default function CountryForm(props) {
  return(
    <>
      <div className="mb-3">
        <label htmlFor="country_code">Code:</label>
        <input type="text" className="form-control" id="country_code" />
      </div>
      <div className="mb-3">
        <label htmlFor="country_name">Name:</label>
        <input type="text" className="form-control" id="country_name" />
      </div>
      <div className="mb-3">
        <label htmlFor="country_population" className="form-label">Population:</label>
        <input type="text" className="form-control" id="country_population" />
      </div>
    </>
  );
}