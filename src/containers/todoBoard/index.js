import React, { useCallback, useState, useRef } from 'react';
import Board from 'components/board';

import { 
  BOARD_TYPE,
  BOARD_TYPES,
} from "utils";

import './styles.scss';

const persistantData = JSON.parse(localStorage.getItem('todos')) || [];

const TodoBoard = () => {
  const taskType = useRef();
  const [taskName, setTaskName] = useState('');
  const [pk, setPk] = useState(0);
  const [searchKey, setSearchKey] = useState('');


  const [DATA, setDATA] = useState(
    persistantData
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
   }, []
  )

  const setPersistData = useCallback(
    (data) => {
      localStorage.setItem('todos', JSON.stringify(data));
      setDATA([
        ...data
      ]);
    },[]
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
      setPersistData(DATA);
     }
   }, [taskName, DATA, pk, setPersistData]
  )

  const onDeleteCard = useCallback(
    (cardId) => {
      setPersistData(DATA.filter(d => d.pk !== cardId))
    }, [setPersistData, DATA]
  )

  const onSelectMoveCard = useCallback(
    (event) => {
      const { cardPk } = event.target.dataset;
      const moveToBoard = event.target.value;

      if (moveToBoard) {
        const index = DATA.findIndex(d => d.pk === parseInt(cardPk))
        DATA[index].boardName = moveToBoard;
        setPersistData(DATA);
      }
    }, [DATA, setPersistData]
  )

  const onEnterTaskName = useCallback(
    (event) => {
      if (event.keyCode === 13) {
        handleAddTask();
      }
    }, [handleAddTask]
  )

  return (
    <div className="todo-board">
      <div className="header">
        <span>Todo Board</span>
        <input type="text" id="myInput" values={searchKey} onKeyUp={handleSearch} placeholder="Search"/>
      </div>

      <div className="task-wrapper">
        <div className="add-task">
          <h3>Add task</h3>
          <input type="text" value={taskName} onChange={handleTaskName} onKeyUp={onEnterTaskName} placeholder="Task Name"/>
          <select name="Change Status" ref={taskType}>
            {
              BOARD_TYPES.map(
                (option, index) => <option key={index} value={option.value}>{`Add to ${option.title}`}</option>
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