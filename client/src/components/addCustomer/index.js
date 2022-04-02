import React from "react";
import Modal from "../modal";

const AddCustomer = (props) => {
    return (
        <Modal close={props?.close}>
            New Customer
        </Modal>
    );
};

export default AddCustomer;