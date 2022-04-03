import React from "react";

const CustomerTable = ({ data }) => {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Total Orders</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((item) => {
                    return (
                        <tr className="table-row">
                            <td>{item?.firstName}</td>
                            <td>{item?.lastName}</td>
                            <td>{item?.email}</td>
                            <td>{item?.orders?.length}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;