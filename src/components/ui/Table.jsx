import React from 'react';
import { formatDate } from '../../utils/dateUtils';

const Table = ({ columns, data, title }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">{title}</h2>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="table-header">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="table-row">
              {columns.map((column) => (
                <td key={column.key} className="table-cell">
                  {column.key === 'createdAt' ? formatDate(row[column.key]) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
