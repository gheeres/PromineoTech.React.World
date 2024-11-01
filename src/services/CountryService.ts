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
  return new Promise<Country[]>((resolve, reject) => {
    setTimeout(async () => {
      const url = `${ config.baseUrl }/countries`;
      console.log(`CountryService: Requesting all countries at ${ url }...`);
      const response = await fetch(url);
      const json = await response.json();
      return resolve(json.map((j : any) => toCountry(j)));
    }, config.delay || 0);
  });
  
}

export async function getCountryByCode(countryCode: string | undefined): Promise<Country | null> {
  if (countryCode) {
    const url = `${ config.baseUrl }/countries/${ countryCode }`;
    console.log(`CountryService: Requesting country by code (${ countryCode }) from  ${ url }...`);
    const response = await fetch(url);
    const json = await response.json();
    return toCountry(json);
  }
  return null;
}
