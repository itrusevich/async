import React from 'react';
import Cells from './Cells';

function Rows({users, keys, onValueSave, filters}) {


  return (
    <>
      {
        users.map(user => <tr> <Cells user={user} keys={keys} onValueSave={onValueSave} filters={filters}/></tr>)
      }
    </>
  )
}

export default Rows;
