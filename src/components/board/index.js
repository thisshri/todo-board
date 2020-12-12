import React from 'react';
import Card from '../card';

import './styles.scss';

const Board = ({
  title,
  cardsData,
  onDeleteCard,
}) => {
  return (
    <div className="board">
      <div className="header">
        <h5>{title}</h5>
        <span>
          ({cardsData.length})
        </span>
      </div>
      <div>
        {
          cardsData.length ?
          cardsData.map(
            data => (
              <Card
                className="card"
                key={data.pk}
                pk={data.pk}
                taskTitle={data.taskTitle}
                boardName={title}
                onDeleteCard={onDeleteCard}
              />
            )
          ):
          <h4>No Card</h4>
        }
      </div>
    </div>
  )
}

export default Board;