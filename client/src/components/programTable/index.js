import React from "react";

const ProgramTable = ({ data }) => {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Steps</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((item) => {
                    return (
                        <tr className="table-row">
                            <td>{item?.name}</td>
                            <td>{item?.price}</td>
                            <td>{item?.steps.map((step) => {
                                return (step?.name + ", ");
                            })}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ProgramTable;