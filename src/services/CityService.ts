import config from '../config';
import type { City } from '../type.ts';

/**
 * Converts the JSON response from the backend API to a City object.
 * @param json The JSON data to convert.
 * @returns The city.
 */
function toCity(json: any) : City | null {
  if (json) {
    return {
      id: json.city_id,
      name: json.city_name,
      location: ((json.latitude) && (json.longitude)) 
        ? {
          latitude: json.latitude,
          longitude: json.longitude,
        } 
        : null
      ,
      population : json.city_population,
    };
  }
  return null;
}

/**
 * Gets all of the cities that are located in the specified country.
 * @param countryCode The unique id of the country.
 * @returns The collection of cities.
 */
export async function getAllCitiesForCountry(countryCode: string) :Promise<City[]> {
  if (countryCode) {
    return new Promise<City[]>((resolve, reject) => {
      setTimeout(async () => {
        const url = `${ config.baseUrl }/countries/${ countryCode }/cities`;
        console.log(`CityService: Requesting all cities for ${ countryCode } at ${ url }...`);
        const response = await fetch(url);
        const json = await response.json();
        return resolve(json.map((j : any) => toCity(j)));
      }, config.delay || 0);
    });
  }
  return [];
}