import { Country } from "../types";
import config from "../config";

function toCountry(json: any): Country | null {
  if (json) {
    return {
      code: json.country_code,
      code2: json.country_code2,
      name: json.country_name,
      continent: json.continent,
      population: json.country_population,
    }
  }
  return null;
}

/**
 * Gets all of the countries.
 * @returns Promise<Country[]> The promise containing all the countries.
 */
export async function getAllCountries() : Promise<Country[]> {
  const url = `${ config.baseUrl }/countries`;
  console.log(`Fetching all countries at ${ url }...`);
  const response = await fetch(url);
  const json = await response.json();
  return json.map((j: any) => toCountry(j) );
}

/**
 * Retrieve a country by it's unique id.
 * @param code The unique 2 or 3 digit code for the country.
 * @returns Promise<Country> The country
 */
export async function getCountryById(code: string): Promise<Country | null>  {
  if (code) {
    const url = `${ config.baseUrl }/countries/${ code }`;
    console.log(`Fetching country by id (${ code }) at ${ url }...`);
    const response = await fetch(url);
    const json = await response.json();
    return toCountry(json);
  }
  return null;
}