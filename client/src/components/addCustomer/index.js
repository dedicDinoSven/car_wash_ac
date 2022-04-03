import React, { useEffect, useState } from "react";
import Modal from "../modal";
import InputField from "../inputField";
import Button from "../button";
import Validation from "../../utils/validation";
import { toast } from "react-toastify";
import { createUser, reset } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const AddCustomer = (props) => {
    const [data, setData] = useState({
        firstName: "", lastName: "", email: ""
    });

    const dispatch = useDispatch();
    const { isError, message } = useSelector((state) => state.users);

    const handleSubmit = () => {
        if (!Validation.validateEmail(data.email))
            toast.error("Please enter valid email!");

        dispatch(createUser(data));
        props?.close();
    };

    useEffect(() => {
        if (isError) toast.error(message);

        dispatch(reset());
    }, [isError, message, dispatch]);

    return (
        <Modal close={props?.close}>
            <h3>New Customer</h3>
            <InputField type="text" id="firstName" name="firstName"
                        placeholder="First Name *" autoFocus
                        style={{ width: "300px" }} value={data.firstName}
                        setValue={(e) => setData(
                            { ...data, firstName: e.target.value })} />
            <InputField type="text" id="lastName" name="lastName"
                        placeholder="Last Name *" value={data.lastName}
                        setValue={(e) => setData(
                            { ...data, lastName: e.target.value })} />
            <InputField type="email" id="email" name="email"
                        placeholder="Email *" value={data.email}
                        setValue={(e) => setData(
                            { ...data, email: e.target.value })} />
            <Button onClick={handleSubmit} variant="submit"
                    disabled={!data.firstName || data.firstName === "" ||
                    !data.lastName || data.lastName === "" || !data.email ||
                    data.email === ""}
                    style={{ marginTop: "30px" }}>Submit</Button>
        </Modal>
    );
};

export default AddCustomer;