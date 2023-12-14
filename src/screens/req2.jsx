import { useCallback, useEffect, useState } from 'react';
import CustomTable from '../components/TableComponent';
import { Dropdown } from 'flowbite-react';
import { Button, Checkbox, Label, TextInput, Radio } from 'flowbite-react';

const URL = "http://localhost:8081";

const RequirementSecond = () => {

    const [userId, setUserId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState(0);
    const [isEmail, setIsEmail] = useState(false);
    const [scammerName, setScammerName] = useState('');
    const [scammerEmail, setScammerEmail] = useState('');
    const [scammerPhoneNumber, setScammerPhoneNumber] = useState('');

    const getAndSetDataB = useCallback(async () => {
        try {
            const data = await fetch(`${URL}/${"scam/save"}`, {
                method: 'POST',
                body: {
                    
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
        } catch(err){
            console.log(err);
        }
    }, [userId, name, email, phoneNumber, age, isEmail, scammerName, scammerEmail, scammerPhoneNumber]);

    return (
        <div>
            <form className="flex max-w-md flex-col gap-4" onSubmit={getAndSetDataB}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="userId" value="User Id" />
                    </div>
                    <TextInput  
                        id="userId"
                        type="number"
                        placeholder="enter userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="User name" />
                    </div>
                    <TextInput  
                        id="name"
                        type="text"
                        placeholder="enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="User email" />
                    </div>
                    <TextInput  
                        id="email"
                        type="email"
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="age" value="User age" />
                    </div>
                    <TextInput  
                        id="age"
                        type="number"
                        placeholder="enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="scammerName" value="scammer name" />
                    </div>
                    <TextInput  
                        id="scammerName"
                        type="text"
                        placeholder="enter scammerName"
                        value={scammerName}
                        onChange={(e) => setScammerName(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <div className="mb-2 inline-block">
                        <Label htmlFor="isEmail1" value="Email" />
                    </div>
                    <Radio  
                        id="isEmail1"
                        checked={isEmail}
                        onChange={(e) => setIsEmail(true)}
                    />
                    <div className="mb-2 inline-block mx-6">
                        <Label htmlFor="isEmail2" value="PhoneNumber" />
                    </div>
                    <Radio  
                        id="isEmail2"
                        checked={!isEmail}
                        onChange={(e) => setIsEmail(false)}
                    />
                </div>
                {isEmail ? (
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="scammerEmail" value="scammer email" />
                        </div>
                        <TextInput  
                            id="scammerEmail"
                            type="email"
                            placeholder="enter scammerEmail"
                            value={scammerEmail}
                            onChange={(e) => setScammerEmail(e.target.value)}
                            required 
                        />
                    </div>
                ) : (
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="scammerPhoneNumber" value="scammer phone number" />
                        </div>
                        <TextInput  
                            id="scammerPhoneNumber"
                            type="text"
                            placeholder="enter scammerPhoneNumber"
                            value={scammerPhoneNumber}
                            onChange={(e) => setScammerPhoneNumber(e.target.value)}
                            required 
                        />
                    </div>
                )}
                
                
                
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default RequirementSecond;
