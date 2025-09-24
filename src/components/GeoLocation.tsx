import { GeoLocation as GeoLocationType } from '../types';

type GeoLocationProps = {
  location: GeoLocationType | undefined,
}

export default function GeoLocation({ location, ...props}: GeoLocationProps) {
  console.log("GeoLocation()");
  if (location) {
    return(
      <>
        <span>{ location.latitude } / { location.longitude }</span>
      </>
    );
  } 
  return; 
}