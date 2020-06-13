import React from 'react';
import Cells from './Cells';

function Rows(props) {


  return (
    <>
      {
        props.users.map(user => <tr> <Cells user={user} keys={props.keys} onValueSave={props.onValueSave}/></tr>)
      }
    </>
  )
}

export default Rows;
