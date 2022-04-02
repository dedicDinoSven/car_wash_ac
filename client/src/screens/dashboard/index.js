import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userData) navigate("/");
    }, [userData]);

    return (
        <>dash</>
    );
};

export default Dashboard;