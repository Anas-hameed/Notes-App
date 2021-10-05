import React, { useState, useEffect, useRef } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list);
  }
  return [];
};
function App() {
  // State define here
  const [val, setval] = useState('');
  const [edititem, setedititem] = useState(null);
  const [edit, isEditing] = useState(true);
  const [list, setlist] = useState(getLocalStorage());
  const [alert, setAlert] = useState({
    show: false,
    msg: 'Hello',
    type: 'success',
  });
  // Deteting item functionality here
  const deleteItem = (key) => {
    setAlert({ show: true, type: 'success', msg: 'item removed' });
    return setlist(list.filter((item) => item.key !== key));
  };

  // Editing the item goes here
  const editItem = (key) => {
    const specificitem = list.find((item) => item.key === key);
    isEditing(false);
    setedititem(key);
    setval(specificitem.item);
  };

  // Form Submit Action goes here
  const handleSubmit = (e) => {
    e.preventDefault();
    if (val) {
      if (!edit) {
        setlist(
          list.map((it) => {
            if (it.key === edititem) {
              return { ...it, item: val };
            }
            return it;
          })
        );
        isEditing(true);
        setval('');
        setedititem(null);
        setAlert({ show: true, msg: 'Edit Successfull', type: 'success' });
      } else {
        setAlert({ show: true, type: 'success', msg: 'Item Added' });
        setlist([...list, { key: new Date().getTime().toString(), item: val }]);
        setval('');
      }
    } else {
      setAlert({ show: true, msg: 'Please Enter value', type: 'danger' });
    }
  };

  // Use effect
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  // Rendering the App goes here
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {/* Alert function here  */}
        {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}

        {/* Form Input Here */}
        <h3>Add a Note</h3>
        <div className='form-control'>
          <input
            className='grocery'
            type='text'
            placeholder='Add Item'
            value={val}
            onChange={(e) => setval(e.target.value)}
          />
          {/* Submit button Here */}
          <button className='submit-btn' type='submit'>
            {edit ? 'Add' : 'edit'}
          </button>
        </div>
      </form>
      {/* List looping here */}
      <List list={list} deleteItem={deleteItem} editItem={editItem} />
      {/* Clear Button Here  */}
      {list.length !== 0 && (
        <button
          className='clear-btn'
          onClick={() => {
            setAlert({ show: true, type: 'danger', msg: 'List Cleared' });
            setlist([]);
          }}
        >
          Clear Items
        </button>
      )}
    </section>
  );
}

export default App;
