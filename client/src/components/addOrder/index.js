import React, { useEffect, useState } from "react";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userSlice";
import { getPrograms } from "../../redux/washingProgramSlice";
import { default as ReactSelect } from "react-select";
import Button from "../button";
import { createOrder, reset } from "../../redux/orderSlice";
import { toast } from "react-toastify";

const AddOrder = (props) => {
    const [data, setData] = useState({ user: "", program: "" });

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const { programs } = useSelector((state) => state.programs);
    const { isError, message } = useSelector((state) => state.orders);

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

    useEffect(() => {
        if (isError) toast.error(message);

        dispatch(reset());
    }, [isError, message, dispatch]);

    return (
        <Modal close={props?.close}>
            <h3>New Order</h3>
            <ReactSelect className="dropdown-input" options={userOptions}
                         closeMenuOnSelect placeholder="Customer *"
                         hideSelectedOptions={false} value={data.user}
                         onChange={(selected) => setData(
                             { ...data, user: selected })} />
            <ReactSelect className="dropdown-input" options={programOptions}
                         closeMenuOnSelect placeholder="Washing Program *"
                         hideSelectedOptions={false} value={data.program}
                         onChange={(selected) => setData(
                             { ...data, program: selected })} />
            <Button onClick={handleSubmit} variant="submit"
                    disabled={data.user === "" || data.program === ""}
                    style={{ marginTop: "30px" }}>Submit</Button>
        </Modal>
    );
};

export default AddOrder;