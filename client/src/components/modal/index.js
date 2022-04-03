import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = (props) => {

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                props.close();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [props]);

    const onWrapperClick = (e) => {
        if (props.close) props.close();

        e.stopPropagation();
    };

    return (
        <div className="modal-wrapper" onClick={onWrapperClick}
             style={props?.style}>
            <div className={"modal " + props?.className}
                 onClick={(e) => e.stopPropagation()}>
                <AiOutlineClose className="close" onClick={() => {
                    props.close && props.close();
                }} />
                {props?.children}
            </div>
        </div>
    );
};
export default Modal;