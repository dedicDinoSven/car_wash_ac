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
        <div className="dashboard-wrapper">
            <h1>Welcome to Car Wash Facility Admin Dashboard</h1>
            <div className="dashboard-table-container">
                <h2>Customers</h2>
            </div>
            <div className="dashboard-table-container">
                <h2>Orders</h2>
            </div>
            <div className="dashboard-table-container">
                <h2>Programs</h2>
            </div>
        </div>
    );
};

export default Dashboard;