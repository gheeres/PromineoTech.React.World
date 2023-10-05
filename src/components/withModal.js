import { Modal } from "bootstrap";
import { useRef, useEffect } from "react";

export default function withModal(Component) {
  return (props) => {
    const modalRef = useRef();
    
    useEffect(() => {
      const modal = Modal.getOrCreateInstance(modalRef.current, { 
        keyboard: false 
      });
      modal.show();
    });

    function handleClose(e) {
      //console.log(`withModal(${ Component.name }).handleClose()`, e);
      const modal = Modal.getInstance(modalRef.current);
      if (props.onClose) {
        props.onClose(modal);
      }
      modal.hide();
    }

    function handleSave(e) {
      //console.log(`withModal(${ Component.name }).handleSave()`, e);
      const modal = Modal.getInstance(modalRef.current);
      if (props.onSave) {
        if (props.onSave(e.target.closest('.modal'), e, modal)) {
          handleClose(e);
        }
      }
      else {
        modal.hide();
      }
    }

    const title = props.title || 'Add / Update';
    return (
      <div className="modal fade" ref={ modalRef } tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{ title }</h5>
              <button type="button" className="btn-close" onClick={ handleClose } data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Component { ...props } />
            </div>
            <div className="modal-footer">
              <button onClick={ handleClose } type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={ handleSave } type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}