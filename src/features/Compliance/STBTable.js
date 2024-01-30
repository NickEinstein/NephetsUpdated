// src/components/Table.js
import React from 'react';

const STBTable = ({ data }) => {
  return (
    <table className="table-auto border-collapse w-full mt-4">
      <thead>
        <tr>
          <th className="border border-teal-500 p-2">Description</th>
          <th className="border border-teal-500 p-2">Decision </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            <td className="border border-teal-500 p-2">{item?.description}</td>
            <td className="border border-teal-500 p-2">{item?.decision}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default STBTable;
