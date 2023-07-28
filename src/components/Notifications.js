import { useSelector } from 'react-redux';

export default function Notifications(props) {
  const isDismissable = (props.dismissable !== undefined) ? props.dismissable : true;
  const notifications = useSelector(state => {
    return state.notification;
  });

  const items = (notifications || []).map((n, index) => {
    return(
      <div key={ index } className={ `alert alert-${ n.level } ${ isDismissable ? " alert-dismissible" : "" } fade show mb-1` } role="alert">
        { n.content }
        { isDismissable ? <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> : '' }
      </div>
    );
  });

  return(
    <div className="toast-container position-absolute top-0 end-0 p-3" id="notification">
      { items }
    </div>
  );
}