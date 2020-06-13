import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Rows from './Rows';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

function App() {

  const [users, setUsers] = useState([]);
  const [keys, setKeys] = useState([]);

  const onValueSave = (id, key, value) => {
    const user = users.find(user => user.id === id);
    user[key] = value;
    
    setUsers([...users]);
  };

  const load = () => {
    console.log('LOAD')
    //   fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response => response.json())
    //     .then(json => {
    //       setUsers(json);
    //     })
    // }
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
    })
      .then((response) => {
        setUsers(response.data);
        setKeys(Object.keys(response.data[0]));
      })
  }


  return (
    <div>
      <button className="btn btn-primary" onClick={load}> Load users</button>
      {
        !!keys.length && !!users.length &&
        <table className="border">
          <tr className="border">
            {
              keys.map(el => <th className="border">{el}</th>)
            }
          </tr>
          <Rows users={users} keys={keys} onValueSave={onValueSave}/>
        </table>
      }
    </div>
  );
}

export default App;
