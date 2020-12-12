import React from 'react';

const SELECT_OPTIONS = [
  {
    value: 'TO DO',
    title: 'Move to Todo',
  },
  {
    value: 'IN PROGRESS',
    title: 'Move to In Progress',
  },
  {
    value: 'COMPLETE',
    title: 'Move to Complete',
  }
]

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
        SELECT_OPTIONS.filter(option => option.value !== boardName).map(
          option => <option value={option.value}>{option.title}</option>
        )
      }
    </select>
    </>
  )
}

export default Card;