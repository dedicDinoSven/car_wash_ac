import React, { useEffect, useState } from "react";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userSlice";
import { getPrograms } from "../../redux/washingProgramSlice";
import { components, default as ReactSelect } from "react-select";
import Button from "../button";
import { createOrder } from "../../redux/orderSlice";

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

const AddOrder = (props) => {
    const [data, setData] = useState({
        user: "", program: []
    });

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const { programs } = useSelector((state) => state.programs);

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getPrograms());
    }, [dispatch]);

    const userOptions = users?.map((user) => {
        return { value: user._id, label: `${user.firstName} ${user.lastName}` };
    });

    const programOptions = programs?.map((program) => {
        return { value: program._id, label: program.name };
    });

    const handleSubmit = () => {
        dispatch(
            createOrder(
                { user: data.user.value, program: data.program.value }));
        props?.close();
    };

    return (
        <Modal close={props?.close}>
            <h3>New Order</h3>
            <ReactSelect options={userOptions} closeMenuOnSelect
                         hideSelectedOptions={false} components={{ Option }}
                         onChange={(selected) => setData(
                             { ...data, user: selected })}
                         value={data.user} className="dropdown-input" />
            <ReactSelect options={programOptions} closeMenuOnSelect
                         hideSelectedOptions={false} components={{ Option }}
                         onChange={(selected) => setData(
                             { ...data, program: selected })}
                         value={data.program}
                         className="dropdown-input-single" />
            <Button onClick={handleSubmit} variant="submit"
                    style={{ marginTop: "30px" }}>Submit</Button>
        </Modal>
    );
};

export default AddOrder;