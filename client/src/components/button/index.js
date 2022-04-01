import React from "react";

const Button = (props) => {
    return (
        <button disabled={props?.disabled} onClick={props?.onClick}
                style={props?.style} type={props?.type ?? "button"}
                className={`button-wrapper ${props.variant
                    ? props.variant : ""}`}>
            {props?.children}</button>
    );
};

export default Button;