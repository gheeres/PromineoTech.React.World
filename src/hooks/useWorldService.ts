import { HttpRequestOptions, CountryModel, CityModel } from '../types.ts';
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
 * Deseralizes JSON into a CityModel object.
 * @param json The json data
 * @returns The instance if successful, otherwise null.
 */
function toCity(json:any): CityModel | null {
  if (json) {
    return {
      id: json.city_id,
      name: json.city_name,
      location: {
        latitude: json.latitude,
        longitude: json.longitude,
      },
      population: json.city_population,
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

/**
 * Gets all of the cities for the specified country.
 * @param {string} country_code The ISO 2 or 3 character unique identifer.
 * @param {HttpRequestOptions} options Custom HTTP options for the request.
 */
export async function getAllCitiesForCountry(country_code: string, options?: HttpRequestOptions | null): Promise<CityModel[]> {
  if (! country_code) {
    return [];
  }
  
  const url = `${ settings.backend.url }/countries/${ country_code }/cities`;
  console.log(`Fetching all cities for ${ country_code } at ${ url }...`);
  const res = await fetch(url);
  const json = await res.json()
  return json.map((element:any) => toCity(element))
             .filter((city:CityModel) => city !== null);  
}

