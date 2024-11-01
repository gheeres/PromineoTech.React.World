export type Country = {
  code: string,
  code2: string,
  name: string,
  continent: string,
  population: number, 
};

export type LatitudeLongitude = {
  latitude: number,
  longitude: number,
};

export type City = {
  id: number,
  name: string,
  location?: LatitudeLongitude | null
  population?: number, 
};