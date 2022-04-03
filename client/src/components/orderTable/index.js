import React from "react";

const OrderTable = ({ data }) => {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>Customer</th>
                    <th>Washing Program</th>
                    <th>Discount</th>
                    <th>Price To Pay</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((item) => {
                    return (
                        <tr className="table-row">
                            <td>{item?.user?.firstName + " " +
                            item?.user?.lastName}</td>
                            <td>{item?.program?.name}</td>
                            <td>{item?.discount ? "Yes" : "No"}</td>
                            <td>{item?.priceToPay}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;