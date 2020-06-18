import React, { useState, useEffect } from 'react';
import './App.css';
import Rows from './Rows';
import THeader from './THeader';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

function App() {
 const [initialUsers, setInitialUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [keys, setKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [labelEdit, setLabelEdit] = useState('');
  const [filterMode, setFilterMode] = useState(false);
  const [filters, setFilters] = useState({});

  const cancelSearch = () => {
    setValueSearch('');
    setFilterMode(false);
    setUsers(initialUsers);
    setLabelEdit('');
    setFilters({});
  }

  const setSearch = (label, valueSearch) => {
    const filteredUsers = users.filter(user => user[label].toLowerCase().includes(valueSearch.toLowerCase()));
    setUsers(filteredUsers);
    filters[label] = valueSearch;
    setFilters({...filters});
  }

  const onValueSave = (id, key, value) => {
    const user = users.find(user => user.id === id);
    user[key] = value;
    setUsers([...users]);
  };

  const handleScroll = () => {
    if ((window.innerHeight + document.documentElement.scrollTop) < (document.documentElement.offsetHeight - 100)) return;
    console.log('Fetch more list items!');
    setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching || filterMode) return;
    let id;
    fetch('https://jsonplaceholder.cypress.io/users')
      .then(response => response.json())
      .then(data => {
        data.map((el, ind) => {
          id = users.length + ind + 1;
          el.id = id;
          return el;
        });
        const newUsers = [...users, ...data];
        setUsers(newUsers);
        setInitialUsers(newUsers);
        setIsFetching(false);
      }).catch(error => console.log(error))
  }, [isFetching, users, filterMode]);

  const load = () => {
    setIsLoading(true)
    fetch('https://jsonplaceholder.cypress.io/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setInitialUsers(data);
        setKeys(Object.keys(data[0]));
        setIsLoading(false);
      }).catch(error => console.log(error))
  };


  return (
    <div>
      {isLoading ? '...Loading' : ''}
      <button className="btn btn-primary" onClick={load} disabled={isLoading}>

        {isLoading ?
          <>
            <span className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"></span>
            <div className="text-center mb-4"></div>
            <span className="sr-only-">Loading...</span>
          </>
          : 'Load users'
        }

      </button>
      {
        !!keys.length && !!users.length &&
        <table className="border">
          <tr className="border">
            {
              keys.map(el => <THeader label={el} 
                              setSearch={setSearch} 
                              valueSearch={valueSearch} 
                              filterMode={filterMode}
                              setFilterMode={setFilterMode}
                              cancelSearch={cancelSearch}
                              setValueSearch={setValueSearch}
                              labelEdit={labelEdit}
                              setLabelEdit={setLabelEdit}/>)
            }
          </tr>
          <Rows users={users} keys={keys} onValueSave={onValueSave} filters={filters}/>
        </table>
      }

      {isFetching}
    </div>
  );
}

export default App;
