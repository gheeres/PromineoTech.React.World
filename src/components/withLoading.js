import { useState } from "react";

export default function withLoading(Component) {
  return (props) => {
    const [ loading, setLoading ] = useState(props.loading !== undefined ? props.loading : true);
    
    return(
      loading 
        ? <div className="d-flex align-items-center m-3">
            <strong className="text-info">Loading...</strong>
            <div className="spinner-border spinner-border-sm text-info ms-auto" role="status" aria-hidden="true"></div>
          </div>
        : <Component { ...props } onLoaded={ () => setLoading(false) } />
    );
  }
}