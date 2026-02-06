import { HttpRequestOptions, CountryModel } from '../types.ts';
import settings from '../settings.ts'

/**
 * Deseralizes JSON into a CountryModel object.
 * @param json The json data
 * @returns The instance if successful, otherwise null.
 */
function toCountry(json:any): CountryModel | null {
  if (json) {
    return {
      code: json.country_code,
      code2: json.country_code2,
      name: json.country_name,
      continent: json.continent,
      population: json.country_population,
    };
  }
  return null;
}

/**
 * Gets all the available countries.
 * @param {HttpRequestOptions} options Custom HTTP options for the request.
 * @returns {Promise<Country[]>} The collection of countries.
 */
export async function getAllCountries(options?: HttpRequestOptions | null): Promise<CountryModel[]> {
  const url = `${ settings.backend.url }/countries`;
  console.log(`Fetching all countries at ${ url }...`);
  const res = await fetch(url);
  const json = await res.json()
  return json.map((element:any) => toCountry(element))
             .filter((country:CountryModel) => country !== null);
}

