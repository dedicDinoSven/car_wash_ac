import React from "react";
import Modal from "../modal";

const AddOrder = (props) => {
    return (
        <Modal close={props?.close}>
            New Order
        </Modal>
    );
};

export default AddOrder;