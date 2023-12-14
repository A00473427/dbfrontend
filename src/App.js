import { useState } from 'react';
import './App.css';
import RequirementFirst from './screens/req1';
import { Button } from 'flowbite-react';
import RequirementSecond from './screens/req2';
import RequirementThird from './screens/req3';

function App() {
  const [req, setReq] = useState(1);
  return (
    <div className="App">
      <Button.Group>
        <Button color="gray" onClick={() => setReq(1)}>Requirement 1</Button>
        <Button color="gray" onClick={() => setReq(2)}>Requirement 2</Button>
        <Button color="gray" onClick={() => setReq(3)}>Requirement 3</Button>
      </Button.Group>
      {
        req == 1 ? (<RequirementFirst/>) : req === 2 ? (<RequirementSecond/>) : (<RequirementThird/>)
      }
    </div>
  );
}

export default App;
