import { useEffect, useState } from 'react';
import { City, Country } from '../types';
import { getAllCountries } from '../services/CountryService';
import CountryDropDown from '../components/CountryDropDown';
import CityTable from '../components/CityTable';
import { getAllCitiesForCountry } from '../services/CityService';

type CitiesProps = {
};

export default function Cities(props: CitiesProps) {
  const [country, setCountry] = useState<Country | null>();
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [cities, setCities] = useState<Array<City>>([]);

  useEffect(() => {
    (async () => {
      const countries = await getAllCountries();
      setCountries(countries);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (country?.code) {
        const cities = await getAllCitiesForCountry(country.code);
        setCities(cities);
      }
    })();
  }, [country])


  function handleCountrySelected(country: Country | null, e: React.ChangeEvent<HTMLSelectElement>) {
    setCountry(country);
  }
  return (
    <>
      <h1>Cities</h1>
      <CountryDropDown countries={countries} onCountrySelected={handleCountrySelected} />
      <CityTable cities={cities} />
    </>
  );
}