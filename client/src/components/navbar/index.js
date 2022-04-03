import React, { useEffect, useState } from "react";
import { FaBars, FaListAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { RiCarWashingFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../redux/authSlice";
import AddCustomer from "../addCustomer";
import AddOrder from "../addOrder";
import AddProgram from "../addProgram";

const Navbar = (props) => {
    const [modalStates, setModalStates] = useState({
        addCustomer: false, addOrder: false, addProgram: false
    });
    const dispatch = useDispatch();

    const toggleSidebar = () => props?.setIsOpen(!props?.isOpen);

    const sidebarData = [
        {
            title: "Add Customer",
            icon: <FaUserPlus />,
            onClick: () => setModalStates({ ...modalStates, addCustomer: true })
        },
        {
            title: "Add Order",
            icon: <FaListAlt />,
            onClick: () => setModalStates({ ...modalStates, addOrder: true })
        },
        {
            title: "Add Washing Program",
            icon: <RiCarWashingFill />,
            onClick: () => setModalStates({ ...modalStates, addProgram: true })
        },
        {
            title: "Sign Out",
            icon: <FaSignOutAlt />,
            onClick: () => {
                dispatch(logout());
                dispatch(reset());
            }
        }
    ];

    useEffect(() => {
        if (props?.clickedOutside)
            props?.setIsOpen(false);
    }, [props?.clickedOutside]);

    return (
        <>
            <div ref={props?.innerRef}>
                <div className="navbar">
                    <FaBars onClick={toggleSidebar} className="navbar-icon" />
                </div>
                <nav className={`navbar-menu ${props?.isOpen ? "open" : ""}`}>
                    <ul className="navbar-menu-items" onClick={toggleSidebar}>
                        <li className="navbar-toggle">
                            <AiOutlineClose className="navbar-icon" />
                        </li>
                        {sidebarData.map((item, index) => {
                            return (
                                <li key={index} className="navbar-item"
                                    onClick={item?.onClick}>
                                    {item?.icon}
                                    <span>{item?.title}</span>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            {modalStates.addCustomer &&
            <AddCustomer close={() => setModalStates(
                { ...modalStates, addCustomer: false })} />}
            {modalStates.addOrder &&
            <AddOrder close={() => setModalStates(
                { ...modalStates, addOrder: false })} />}
            {modalStates.addProgram &&
            <AddProgram close={() => setModalStates(
                { ...modalStates, addProgram: false })} />}
        </>
    );
};

export default Navbar;