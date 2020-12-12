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
          cardsData.length ?
          cardsData.map(
            data => <Card key={data.pk} taskTitle={data.taskTitle} boardName={title}/>
          ):
          <h4>No Card</h4>
        }
      </div>
    </div>
  )
}

export default Board;