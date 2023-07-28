import { useState } from "react";

export default function withLoading(Component) {
  return (props) => {
    const [ loading, setLoading] = useState((props.loading !== undefined)
                                              ? props.loading 
                                              : true);
    if (loading) {
      return(
        <div className="d-flex align-items-center m-3">
          <strong className="text-info">Loading...</strong>
          <div className="spinner-border spinner-border-sm text-info ms-auto" role="status"></div>
        </div>
      );  
    }

    return <Component { ...props } onLoaded={ () => setLoading(false) } />
  };
}