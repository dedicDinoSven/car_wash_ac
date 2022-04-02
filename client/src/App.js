import React, { useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar";
import { useSelector } from "react-redux";
import useOutsideClick from "./customHooks/useOutsideClick";

function App() {
    const navbarRef = useRef(null);
    const clickedOutside = useOutsideClick(navbarRef);

    const { userData } = useSelector((state) => state.auth);
    return (
        <>
            <BrowserRouter>
                {userData &&
                <Navbar innerRef={navbarRef} clickedOutside={clickedOutside} />}
                <div className="app-wrapper">
                    <Routes>
                        <Route exact path="/" element={<Login />} />
                        <Route exact path="/dashboard"
                               element={<Dashboard />} />
                    </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer position="bottom-center" theme="colored"
                            autoClose={3500} closeOnClick draggable
                            pauseOnFocusLoss pauseOnHover />
        </>
    );
}

export default App;
