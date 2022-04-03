import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUsers } from "../../redux/userSlice";
import { getOrders } from "../../redux/orderSlice";
import { getPrograms } from "../../redux/washingProgramSlice";
import CustomerTable from "../../components/customerTable";
import OrderTable from "../../components/orderTable";
import ProgramTable from "../../components/programTable";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.users);
    const { orders } = useSelector((state) => state.orders);
    const { programs } = useSelector((state) => state.programs);

    useEffect(() => {
        if (!userData) navigate("/");

        dispatch(getUsers());
        dispatch(getOrders());
        dispatch(getPrograms());

    }, [userData]);

    return (
        <div className="dashboard-wrapper">
            <h1>Welcome to Car Wash Facility Admin Dashboard</h1>
            <div className="dashboard-table-container">
                <h2>Customers</h2>
                <CustomerTable data={users} />
            </div>
            <div className="dashboard-table-container">
                <h2>Orders</h2>
                <OrderTable data={orders} />
            </div>
            <div className="dashboard-table-container">
                <h2>Programs</h2>
                <ProgramTable data={programs} />
            </div>
        </div>
    );
};

export default Dashboard;