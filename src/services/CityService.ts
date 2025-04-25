import { City } from "../types";
import config from "../config";

function toCity(json: any): City | null {
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

export async function getAllCitiesForCountry(code: string): Promise<City[]> {
  if (code) {
    const url = `${ config.baseUrl }/countries/${ code }/cities`;
    console.log(`Fetching all countries at ${ url }...`);
    const response = await fetch(url);
    const json = await response.json();
    return json.map((j: any) => toCity(j) );
  }  
  return [];
}
