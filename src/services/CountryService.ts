import config from '../config';
import { Country } from '../types';

/**
 * Converts json to a Country object.
 * @param json The json
 * @returns The serialized country object.
 */
function toCountry(json: any): Country | null {
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

export async function getAllCountries(): Promise<Country[] | null> {
  const url = `${ config.baseUrl }/countries`;
  console.log(`CountryService: Requesting all countries at ${ url }...`);
  const response = await fetch(url);
  const json = await response.json();

  //let countries = [];
  //for(let j of json) {
  //  countries.push(toCountry(j));
  //}
  //return countries;
  return json.map((j:any) => toCountry(j));
}