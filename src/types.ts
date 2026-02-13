export type CountryModel = {
  code: string,
  code2?: string,
  name: string,
  continent?: string,
  population?: number
};

export type GeoLocation = {
  latitude: number,
  longitude: number,
}
export type CityModel = {
  id: number,
  name: string,
  location?: GeoLocation,
  population?: number,
}

export type HttpRequestOptions = {
};