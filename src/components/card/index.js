import React from 'react';

import {
  BOARD_TYPES,
} from 'utils';

import './styles.scss';

const Card = ({
  taskTitle,
  boardName,
}) => {
  return (
    <div className="card">
      <div className="header">
        <span>
          {taskTitle}
        </span>
        <button>
          Delete
        </button>
      </div>
      <select name="Change Status">
        <option value="">Move to board</option>
        {
          BOARD_TYPES.filter(
            option => option.value !== boardName
          ).map(
            option => <option value={option.value}>{option.title}</option>
          )
        }
      </select>
    </div>
  )
}

export default Card;
