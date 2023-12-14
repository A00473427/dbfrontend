// TableComponent.js
import React from 'react';
import { Table } from 'flowbite-react';

const CustomTable = ({ columnsConfig, tableHeader, styles, data }) => {
  return (
    <div>
      <h2>{tableHeader}</h2>
      <Table striped>
        <Table.Head className="p-4">
            {columnsConfig.map((column) => (
              <Table.HeadCell key={column.key}>{column.name}</Table.HeadCell>
            ))}
        </Table.Head>
        <Table.Body>
          {data.map((row, index) => (
            <Table.Row key={index}>
              {columnsConfig.map((column) => (
                <Table.Cell key={column.key}>{row[column.key]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CustomTable;
