import React, { useCallback, useState, useRef } from 'react';
import Board from 'components/board';

import { 
  BOARD_TYPE,
  BOARD_TYPES,
} from "utils";

import './styles.scss';

const TodoBoard = () => {
  const taskType = useRef();
  const [taskName, setTaskName] = useState('');
  const [pk, setPk] = useState(0);
  const [searchKey, setSearchKey] = useState('');

  const [DATA, setDATA] = useState(
    [
      {
        pk: -1,
        taskTitle: 'Finish this assignment',
        boardName: BOARD_TYPE.TODO,
      },
    ]
  );

  const [filteredData, setFilteredData] = useState([]);

  const getData = useCallback(
    (boardName) => {
      if (searchKey) {
        return filteredData.filter(
          data => data.boardName === boardName
        );
      }
      return DATA.filter(
        data => data.boardName === boardName
      );
    }, [DATA, filteredData, searchKey]
  )

  const handleSearch = useCallback(
   (event) => {
    setSearchKey(event.target.value);
    setFilteredData(
      DATA.filter(
        d => d.taskTitle.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
      )
    );
   }, [DATA]
  )

  const handleTaskName = useCallback(
   (event) => {
     setTaskName(event.target.value)
     console.log(taskName);
   }, [taskName]
  )

  const handleAddTask = useCallback(
   () => {
     if (taskName) {
      setPk(pk+1)
      const newTask = {
        taskTitle: taskName,
        boardName: taskType.current.value,
        pk: pk,
      };

      setTaskName('');
      DATA.push(newTask)
      setDATA([
        ...DATA,
      ]);
     }
   }, [taskName, DATA, pk]
  )

  const onDeleteCard = useCallback(
    (cardId) => {
      setDATA(DATA.filter(d => d.pk !== cardId))
    }, [DATA]
  )

  const onSelectMoveCard = useCallback(
    (event) => {
      const { cardPk } = event.target.dataset;
      const moveToBoard = event.target.value;

      if (moveToBoard) {
        const index = DATA.findIndex(d => d.pk === parseInt(cardPk))
        DATA[index].boardName = moveToBoard;
        setDATA([
        ...DATA
        ]);
      }
    }, [DATA]
  )

  return (
    <div className="todo-board">
      <div className="header">
        <h1>Todo Board</h1>
        <input type="text" id="myInput" values={searchKey} onKeyUp={handleSearch} placeholder="Search"/>
      </div>

      <div className="task-wrapper">
        <div className="add-task">
          <h3>Add task</h3>
          <input type="text" value={taskName} onChange={handleTaskName} placeholder="Task Name"/>
          <select name="Change Status" ref={taskType}>
            {
              BOARD_TYPES.map(
                (option, index) => <option key={index} value={option.value}>{option.title}</option>
              )
            }
          </select>
          <button onClick={handleAddTask}>
            ADD
          </button>
        </div>
      </div>
      <div className="boards">
        <Board
          title={BOARD_TYPE.TODO}
          cardsData={getData(BOARD_TYPE.TODO)}
          onDeleteCard={onDeleteCard}
          onSelectMoveCard={onSelectMoveCard}
        />
        <Board
          title={BOARD_TYPE.IN_PROGRESS}
          cardsData={getData(BOARD_TYPE.IN_PROGRESS)}
          onDeleteCard={onDeleteCard}
          onSelectMoveCard={onSelectMoveCard}
        />
        <Board
          title={BOARD_TYPE.COMPLETE}
          cardsData={getData(BOARD_TYPE.COMPLETE)}
          onDeleteCard={onDeleteCard}
          onSelectMoveCard={onSelectMoveCard}
        />
      </div>
    </div>
  )
}

export default TodoBoard;