import { useCallback, useEffect, useState } from 'react';
import CustomTable from '../components/TableComponent';
import { Dropdown } from 'flowbite-react';

const URL = "http://localhost:8081";

const RequirementFirst = () => {

    const [currentTable, setCurrentTable] = useState('call_record');
    const [tableData, setTableData] = useState([]);

    const TABLE_KEYS = ["call_record","email_record","record","scam_category","scammer","scams","user"];

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
            console.log(data);
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
                                {TABLE_DETAILS[key].TABLE_NAME}
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

const TABLE_DETAILS = {
    'call_record': {
        TABLE_NAME: 'Call Records',
        PATH: 'callrecord/all',
        COLUMN_CONFIG: [
            { name: 'Record ID', key: 'id.recordId' },
            { name: 'Phone Number', key: 'id.phoneNumber' },
            { name: 'Duration', key: 'duration' },
        ],
    },
    'email_record': {
        TABLE_NAME: 'Email Records',
        PATH: 'emailrecord/all',
        COLUMN_CONFIG: [
            { name: 'Record ID', key: 'id.recordId' },
            { name: 'Email', key: 'id.email' },
            { name: 'Content', key: 'content' },
        ],
    },
    'record': {
        TABLE_NAME: 'Records',
        PATH: 'record/all',
        COLUMN_CONFIG: [
            { name: 'Record ID', key: 'record.recordId' },
            { name: 'User ID', key: 'record.user.userId' },
            { name: 'Scammer ID', key: 'record.scammer.scammerId' },
            { name: 'Reported', key: 'record.reported' },
        ],
    },
    'scam_category': {
        TABLE_NAME: 'Scam Categories',
        PATH: 'scamcategory/all',
        COLUMN_CONFIG: [
            { name: 'Category ID', key: 'categoryId' },
            { name: 'Type', key: 'type' },
            { name: 'Description', key: 'description' },
        ],
    },
    'scammer': {
        TABLE_NAME: 'Scammers',
        PATH: 'scammer/all',
        COLUMN_CONFIG: [
            { name: 'Scammer ID', key: 'scammerId' },
            { name: 'Phone Number', key: 'phoneNumber' },
            { name: 'Email', key: 'email' },
            { name: 'Scam Category ID', key: 'scamCategory.CategoryId' },
        ],
    },
    'scams': {
        TABLE_NAME: 'Scams',
        PATH: 'scam/all',
        COLUMN_CONFIG: [
            { name: 'Scam ID', key: 'scamId' },
            { name: 'Scammer ID', key: 'scammer.scammerId' },
            { name: 'Scammer Phone Number', key: 'scammer.phoneNumber' },
            { name: 'Scammer Email', key: 'scammer.email' },
            { name: 'Scam Category', key: 'scammer.scamCategory.categoryId' },
        ],
    },
    'user': {
        TABLE_NAME: 'Users',
        PATH: 'user/all',
        COLUMN_CONFIG: [
            { name: 'User ID', key: 'userId' },
            { name: 'Phone Number', key: 'phoneNumber' },
            { name: 'Email', key: 'email' },
            { name: 'Name', key: 'name' },
            { name: 'Age', key: 'age' },
        ],
    },
};

export default RequirementFirst;
