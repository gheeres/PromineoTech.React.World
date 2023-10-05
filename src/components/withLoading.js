import { useState } from "react";

export default function withLoading(Component) {
  return (props) => {
    const loading = (props.loading !== undefined) ? props.loading : true;

    //console.log(`withLoading(${ Component.name }): ${ loading ? 'Loading...' : 'Loaded!' }`);
    return(
      loading 
        ? <div className="d-flex align-items-center m-3">
            <strong className="text-info">Loading...</strong>
            <div className="spinner-border spinner-border-sm text-info ms-auto" role="status" aria-hidden="true"></div>
          </div>
        : <Component { ...props } />
    ); 
  };
};