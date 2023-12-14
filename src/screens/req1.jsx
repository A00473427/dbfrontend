import { useCallback, useEffect, useState } from 'react';
import CustomTable from '../components/TableComponent';
import { Dropdown } from 'flowbite-react';

const TABLE_KEYS = ['TABLE_1'];
const TABLE_DETAILS = {
    'TABLE_1': {
        TABLE_NAME: 'table_name',
        PATH: 'apiPath',
        COLUMN_CONFIG: [
            { name: 'Name', key: 'name' },
            { name: 'Age', key: 'age' },
        ],
    }
};
const URL = "";

const RequirementFirst = () => {

    const [currentTable, setCurrentTable] = useState('TABLE_1');
    const [tableData, setTableData] = useState([]);

    const getAndSetData = useCallback(async () => {
        try {
            const data = await fetch(`${URL}/${TABLE_DETAILS[currentTable].PATH}`).then((res) => {
                return res.json()
            }).catch((err) => {
                console.log(err);
                return [
                    { name: 'John Doe', age: 25 },
                    { name: 'Jane Doe', age: 30 },
                ];
            });
            setTableData(data);
        } catch(err){
            console.log(err);
            setTableData([
                { name: 'John Doe', age: 25 },
                { name: 'Jane Doe', age: 30 },
            ]);
        }
    }, [currentTable, tableData]);
    
    useEffect(() => {
        getAndSetData();
    }, [currentTable]);

    return (
        <div>
            <Dropdown label={TABLE_DETAILS[currentTable].TABLE_NAME}>
                {
                    TABLE_KEYS.map(
                        (key) => (
                            <Dropdown.Item onClick={() => setCurrentTable(key)}>
                                {TABLE_DETAILS[currentTable].TABLE_NAME}
                            </Dropdown.Item>
                        )
                    )
                }
            </Dropdown>
            <CustomTable 
                columnsConfig={TABLE_DETAILS[currentTable].COLUMN_CONFIG} 
                tableHeader={TABLE_DETAILS[currentTable].TABLE_NAME} 
                data={tableData} 
            />
        </div>
    );
};

export default RequirementFirst;
