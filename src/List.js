import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ list, deleteItem, editItem }) => {
  return (
    <article className='grocery-container'>
      {list.map((item) => {
        return (
          <div className='grocery-item' key={item.key}>
            <p className='title'>{item.item}</p>
            <div>
              <FaEdit className='edit-btn' onClick={() => editItem(item.key)} />
              <FaTrash
                className='delete-btn'
                onClick={() => deleteItem(item.key)}
              />
            </div>
          </div>
        );
      })}
    </article>
  );
};

export default List;
