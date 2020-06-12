import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);

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
      })
  }


  return (
    <div>
      <button onClick={load}> Load todos</button>

      <ul>

        {
          users.map(el => <li key={el.id}>{el.name}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
