export type HttpRequestOptions = {
};

export type Country = {
  code: string,
  name: string,
  code2?: string,
  continent?: string,
  population?: number,
};

export type GeoLocation = {
  latitude: number,
  longitude: number
}

export type City = {
  id: number,
  name: string,
  location?: GeoLocation,
  population?: number,
}