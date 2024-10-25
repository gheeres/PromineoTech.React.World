import config from '../config';
import { Country } from '../type';

/**
 * Converts the JSON response from the backend API to a Country object.
 * @param json The JSON data to convert.
 * @returns The country.
 */
function toCountry(json: any) : Country | null {
  if (json) {
    return {
      code: json.country_code,
      code2: json.country_code2,
      name: json.country_name,
      continent: json.continent,
      population : json.country_population,
    };
  }
  return null;
}

/**
 * Retrieves all of the countries.
 * @returns All the countries.
 */
export async function getAllCountries() : Promise<Country[]> {
  const url = `${ config.baseUrl }/countries`;
  console.log(`CountryService: Requesting all countries at ${ url }...`);
  const response = await fetch(url);
  const json = await response.json();
  return json.map((j : any) => toCountry(j));
}
