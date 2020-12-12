import React from 'react';

import {
  BOARD_TYPES,
} from 'utils';

import './styles.scss';

const Card = ({
  taskTitle,
  boardName,
  onDeleteCard,
  pk,
  onSelectMoveCard,
}) => {
  return (
    <div className="card">
      <div className="header">
        <span>
          {taskTitle}
        </span>
        <button onClick={() => onDeleteCard(pk)}>
          Delete
        </button>
      </div>
      <select data-card-pk={pk} name="Change Status" onChange={onSelectMoveCard}>
        <option value="">Change Status</option>
        {
          BOARD_TYPES.filter(
            option => option.value !== boardName
          ).map(
            option => <option key={option.value} value={option.value}>{`Change To ${option.title}`}</option>
          )
        }
      </select>
    </div>
  )
}

export default Card;
