import { useCallback, useEffect, useState } from 'react';
import CustomTable from '../components/TableComponent';
import { Dropdown } from 'flowbite-react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

const TABLE_KEYS = ['A', 'B'];
const TABLE_DETAILS = {
    'A': {
        TABLE_NAME: 'table_name',
        PATH: 'apiPath',
        COLUMN_CONFIG: [
            { name: 'Name', key: 'name' },
            { name: 'Age', key: 'age' },
        ],
    },
    'B': {
        TABLE_NAME: 'table_name',
        PATH: 'apiPath',
        COLUMN_CONFIG: [
            { name: 'Name', key: 'name' },
            { name: 'Age', key: 'age' },
        ],
    }
};
const URL = "";

const RequirementThird = () => {

    const [currentTable, setCurrentTable] = useState('A');
    const [tableData, setTableData] = useState([]);
    const [startAge, setStartAge] = useState(0);
    const [endAge, setEndAge] = useState(0);

    const getAndSetDataA = useCallback(async () => {
        try {
            const data = await fetch(`${URL}/${TABLE_DETAILS['A'].PATH}`).then((res) => {
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

    const getAndSetDataB = useCallback(async () => {
        try {
            const data = await fetch(`${URL}/${TABLE_DETAILS['B'].PATH}`, {
                method: 'POST',
                body: {
                    startAge,
                    endAge
                }
            }).then((res) => {
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
    }, [currentTable, tableData, startAge, endAge]);
    
    useEffect(() => {
        if(currentTable === 'A'){
            getAndSetDataA();
        }
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
            {
                currentTable === 'B' ? (
                    <>
                        <form className="flex max-w-md flex-col gap-4" onSubmit={getAndSetDataB}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="start" value="Start Age" />
                                </div>
                                <TextInput  
                                    id="start"
                                    type="number"
                                    placeholder="enter start age"
                                    value={startAge}
                                    onChange={(e) => setStartAge(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                            <div className="mb-2 block">
                                    <Label htmlFor="end" value="End Age" />
                                </div>
                                <TextInput  
                                    id="end"
                                    type="number"
                                    placeholder="enter end age"
                                    value={startAge}
                                    onChange={(e) => setEndAge(e.target.value)}
                                    required 
                                />
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </>
                ) : ""
            }
            <CustomTable 
                columnsConfig={TABLE_DETAILS[currentTable].COLUMN_CONFIG} 
                tableHeader={TABLE_DETAILS[currentTable].TABLE_NAME} 
                data={tableData} 
            />
        </div>
    );
};

export default RequirementThird;
