import React, { useEffect, useState } from "react";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { createProgram, getSteps } from "../../redux/washingProgramSlice";
import InputField from "../inputField";
import { components, default as ReactSelect } from "react-select";
import Button from "../button";
import { toast } from "react-toastify";
import { reset } from "../../redux/userSlice";

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input type="checkbox" checked={props.isSelected}
                       onChange={() => null} />
                <label>{" "}{props.label}</label>
            </components.Option>

        </div>
    );
};

const AddProgram = (props) => {
    const [data, setData] = useState({
        name: "", steps: [], price: 1
    });

    const dispatch = useDispatch();
    const { steps, isError, message } = useSelector(
        (state) => state.programs);

    useEffect(() => {
        dispatch(getSteps());
    }, [dispatch]);

    const dropdownOptions = steps?.map((step) => {
        return { value: step._id, label: step.name };
    });

    const handleSubmit = () => {
        const _data = {
            name: data.name,
            price: data.price,
            steps: data.steps.map((item) => item.value)
        };

        dispatch(createProgram(_data));
        props?.close();
    };

    useEffect(() => {
        if (isError) toast.error(message);

        dispatch(reset());
    }, [isError, message, dispatch]);

    return (
        <Modal close={props?.close}>
            <h3>New Washing Program</h3>
            <InputField type="text" id="name" name="name"
                        placeholder="Program Name *" autoFocus
                        value={data.name}
                        setValue={(e) => setData(
                            { ...data, name: e.target.value })} />
            <InputField type="number" id="price" name="price"
                        placeholder="Price *" value={data.price}
                        setValue={(e) => setData(
                            { ...data, price: e.target.value })} />
            <ReactSelect options={dropdownOptions} isMulti
                         closeMenuOnSelect={false}
                         hideSelectedOptions={false} components={{ Option }}
                         onChange={(selected) => setData(
                             { ...data, steps: selected })}
                         allowSelectAll={true} value={data.steps}
                         className="dropdown-input" />

            <Button onClick={handleSubmit} variant="submit"
                    style={{ marginTop: "30px" }}>Submit</Button>
        </Modal>
    );
};

export default AddProgram;

const customStyles = {
    control: () => ({
        width: 215
    })
};