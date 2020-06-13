import React, {useState} from 'react';
import './App.css';

const getPropString = (value) => {
  if (typeof value === "object") {
    return Object.keys(value).map(key => `<strong>${key}:</strong> </br>${getPropString(value[key])}`).join("</br>");
  } else {
    return value;
  }
}

const penIcon = <svg className="bi bi-pen" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M5.707 13.707a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391L10.086 2.5a2 2 0 0 1 2.828 0l.586.586a2 2 0 0 1 0 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 0 1 1.414 0l.586.586a1 1 0 0 1 0 1.414L5 13l-3 1 1-3z" />
  <path fillRule="evenodd" d="M9.854 2.56a.5.5 0 0 0-.708 0L5.854 5.855a.5.5 0 0 1-.708-.708L8.44 1.854a1.5 1.5 0 0 1 2.122 0l.293.292a.5.5 0 0 1-.707.708l-.293-.293z" />
  <path d="M13.293 1.207a1 1 0 0 1 1.414 0l.03.03a1 1 0 0 1 .03 1.383L13.5 4 12 2.5l1.293-1.293z" />
</svg>;


function Cells({user, keys, onValueSave}) {
  const [keyEdit, setKeyEdit] = useState('');
  const [valueEdit, setValueEdit] = useState('');

  const cancelEdit = () => {
    setKeyEdit('');
    setValueEdit('');
  }

  const valueSave = (e) => {
    const field = e.target.dataset.field;
    const input = document.querySelector(`#user-field-${user.id}-${field} input`);
    const val = input.value;
    onValueSave(user.id, field, val);
    cancelEdit();
  } 

  const onInputChange = e => {
    setValueEdit(e.target.value);
  }

  return (
    <>
      {
        keys.map(key => { 
          return key === keyEdit ?
            <td id={`user-field-${user.id}-${key}`}>
              <input type="text" className="form-control" value={valueEdit} onChange={onInputChange} />
              <button data-field={key} className="btn btn-primary btn-sm margin-left mt-1" onClick={valueSave}>Save</button>
              <button className="btn btn-secondary btn-sm margin-left mt-1" onClick={cancelEdit}>Cancel</button>
            </td>
          : <td>
              <div dangerouslySetInnerHTML={{ __html: getPropString(user[key]) }} />
              { key !== 'id' && <span onClick={() => {setKeyEdit(key); setValueEdit(user[key])}}>
                {penIcon}
              </span>}
            </td>
        })
      }
    </>
  )
}

export default Cells;
