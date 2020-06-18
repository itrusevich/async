import React, { useState } from 'react';
import './App.css';

const getHighlightedString = (str, hilitedText = '') => {
  if (!hilitedText) {
    return str;
  }

  return str.replace(new RegExp(hilitedText, 'gi'), `<span class="hilited">${hilitedText}</span>`);
};

const getPropString = (value, filterValue = '') => {
  if (typeof value === "object") {
    return Object.keys(value).map(key => `<strong>${key}:</strong> </br>${getPropString(value[key])}`).join("</br>");
  } else {
    return getHighlightedString(value, filterValue);
  }
}

function Cells({ user, keys, onValueSave, filters }) {
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
            : (key !== 'id' && key !== 'company' && key !== 'address') ?
              <td onDoubleClick={() => { setKeyEdit(key); setValueEdit(user[key]) }}>
                <div dangerouslySetInnerHTML={{ __html: getPropString(user[key], filters[key]) }} />
              </td>
              : <td>
                <div dangerouslySetInnerHTML={{ __html: getPropString(user[key]) }} />
              </td>
        })
      }
    </>
  )
}

export default Cells;
