import { useState } from "react";
import Spinner from "./Spinner";


export default function withLoading(Component) {
  return (props) => {
    const [ isLoading, setIsLoading ] = useState(props.loading !== undefined ? props.loading : true);
    return (
      isLoading
        ? <Spinner />
        : <Component { ...props } onLoaded={ (e) => setIsLoading(false) } />
    );
  };
}