import { useEffect, useState } from "react";
import Loading from "./Loading";

type WithLoadingProps = {
  isLoading?: boolean,
  text? : string
};

export default function withLoading(Component: React.FC<any & WithLoadingProps>) {
  return (props: any) => {
    const [ isLoading, setIsLoading ] = useState(props.isLoading !== undefined ? props.isLoading : true);
    useEffect(() => {
      setIsLoading(isLoading)
    }, [ props.isLoading, props.text ]);

    return (isLoading === undefined || isLoading)
     ? <Loading text={ props.text } />      
     : <Component { ...props } />
  };
}