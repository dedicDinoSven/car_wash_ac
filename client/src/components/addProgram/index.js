import React from "react";
import Modal from "../modal";

const AddProgram = (props) => {
    return (
        <Modal close={props?.close}>
            New Washing Program
        </Modal>
    );
};

export default AddProgram;