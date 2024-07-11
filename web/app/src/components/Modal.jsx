import React from 'react'
import "../App.css"


const Modal = (props) => {
    let modalSize = "modal-dialog"

    if(props.modalSize){
        modalSize += " " + props.modalSize
    }

    return (
        <div className="modal" id={props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={modalSize}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{props.title}</h1>
                        <button id="btnModalClose" type="button" className="btn-close btnClose" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal