import { useState } from "react";

export default function withModal(WrappedComponent) {
  return function(props) {
    const [ disabled, setDisabled ] = useState(props.disabled || false);
    const [ modal, setModal ] = useState(false);
    const modalRef = useRef(); 
    const saveFunc = useRef(null);
  
    useEffect(() => {
      const modal = new Modal(modalRef.current, { keyboard: false });
      setModal(modal);
      modal.show();
    }, []);

    function handleClose(e) {
      modal.hide();
      if (props.onClose) {
        props.onClose(modalRef);
      }
    }

    function handleSave(e) {
      saveFunc.current(e).then(() => {
        handleClose();
      });
    }

    const title = props.title || 'Add or Update';
    return (
      <div className="py-2">
        <div className="modal" tabIndex="-1" ref={ modalRef }>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{ title }</h5>
                <button type="button" className="btn-close" onClick={ handleClose } data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <WrappedComponent { ...props } 
                                  save={ saveFunc }
                                  enable={ () => setDisabled(true) } disable={ () => setDisabled(false) } />
              </div>
              <div className="modal-footer">
                <button onClick={ handleClose } type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Cancel">
                  Cancel
                </button>
                <button onClick={ handleSave } type="button" className="btn btn-primary btn-save" disabled={ disabled ? '' : 'disabled' }>
                  Save &nbsp; <i className="bi bi-save"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}