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
                {data?.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item?.name}</td>
                            <td>{item?.price}</td>
                            <td>{item?.steps.map((step, index) => {
                                return <span key={index}>
                                    {(index ? ", " : " ") + step?.name}</span>;
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