import React from 'react';

// import './styles.scss';
import Card from '../card';

const Board = ({
  title,
  cardsData,
}) => {
  return (
    <div>
      <h6>{ `${title} (${cardsData.length || '0'})` }</h6>
      <div>
        {
          cardsData.length && cardsData.map(
            data => <Card taskTitle={data.taskTitle} boardName={title}/>
          )
        }
      </div>
    </div>
  )
}

export default Board;