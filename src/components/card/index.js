import React from 'react';

import {
  BOARD_TYPES,
} from 'utils';

const Card = ({
  taskTitle,
  boardName,
}) => {
  return (
    <>
    <div>
      <p>
        {taskTitle}
      </p>
      <button>
        delete
      </button>
    </div>
    <select name="Change Status">
      {
        BOARD_TYPES.filter(
          option => option.value !== boardName
        ).map(
          option => <option value={option.value}>{option.title}</option>
        )
      }
    </select>
    </>
  )
}

export default Card;
