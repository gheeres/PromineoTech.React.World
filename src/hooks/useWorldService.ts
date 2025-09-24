import config from '../config';
import { HttpRequestOptions, Country, City } from '../types';

/**
 * Serializes a Country object from the provided JSON.
 * @param json {Object} The json representation of a country
 * @returns {Country} The created instead or null if serilization failed.
 */
function toCountry(json: any): Country | null {
  if (json) {
    return {
      code: json.country_code,
      name: json.country_name,
      code2: json.country_code2,
      continent : json.continent,
      population: json.country_population || 0,
    }; 
  }
  return null;
}

/**
 * Serializes a City object from the provided JSON.
 * @param json {Object} The json representation of a country
 * @returns {City} The created instead or null if serilization failed.
 */
function toCity(json: any): City | null {
  if (json) {
    return {
      id: json.city_id,
      name: json.city_name,
      location: {
        latitude: json.latitude,
        longitude: json.longitude,
      },
      population: json.city_population || 0,
    }; 
  }
  return null;
}
/**
 * Gets all of the available countries.
 * @param options {HttpRequestOption} Custom HTTP options for the request.
 * @returns {Promise<Country[]>} The collection of countries.
 */
export async function getAllCountries(options?: HttpRequestOptions | null): Promise<Country[]> {
  const url = `${ config?.backend?.url }/countries`;
  console.log(`Fetching all countries at ${ url }...`);
  const response = await fetch(url);
  const json = await response.json();

  return json.map((element:any) => toCountry(element))
             .filter((country:Country) => country !== null);
}

export async function getCountryById(countryCode: string, options?:HttpRequestOptions | null):Promise<Country|null> {
  if (countryCode) {
    const url = `${ config?.backend?.url }/countries/${ countryCode }`;
    console.log(`Fetching country by id at ${ url }...`);
    const response = await fetch(url);
    const json = await response.json();

    return toCountry(json);
  }  
  return null;
}

export async function getCitiesForCountry(countryCode: string,
                                          options?:HttpRequestOptions | null):Promise<City[]> {
  if (countryCode) {
    const url = `${ config?.backend?.url }/countries/${ countryCode }/cities`;
    console.log(`Fetching all cities for ${ countryCode } at ${ url }...`);
    const response = await fetch(url);
    const json = await response.json();

    return json.map((element:any) => toCity(element))
               .filter((city:City) => city !== null);
  }  
  return [];                                            
}