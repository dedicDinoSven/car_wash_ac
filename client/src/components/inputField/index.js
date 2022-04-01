import React, { useState } from "react";

const InputField = (props) => {
    const [focused, setFocused] = useState(false);

    const handleBlur = () => {
        if (props?.value === "")
            setFocused(false);
    };

    return (
        <div className={`input-field-wrapper ${focused ? "focused" : ""}`}
             style={props?.style}>
            <label htmlFor={props?.id}>{props?.placeholder}</label>
            {props?.type === "textarea" ?
                <textarea value={props?.value} onChange={props?.setValue}
                          rows={props?.rows} cols={props?.cols}
                          id={props?.id} name={props?.name}
                          disabled={props?.disabled ?? false}
                          autoFocus={props?.autoFocus ?? false}
                          onFocus={() => setFocused(true)}
                          onBlur={handleBlur} /> :
                <input value={props?.value} onChange={props?.setValue}
                       type={props?.type} id={props?.id} name={props?.name}
                       disabled={props?.disabled ?? false}
                       autoFocus={props?.autoFocus ?? false}
                       onFocus={() => setFocused(true)}
                       onBlur={handleBlur} />}
        </div>
    );
};

export default InputField;