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

  const [DATA, setDATA] = useState(
    [
      {
        id: 0,
        taskTitle: 'Finish this assignment',
        boardName: BOARD_TYPE.TODO,
      },
    ]
  );

  const [filteredData, setFilteredData] = useState([]);

  const getData = useCallback(
    (boardName) => {
      if (filteredData.length) {
        return filteredData.filter(
          data => data.boardName === boardName
        );
      }
      return DATA.filter(
        data => data.boardName === boardName
      );
    }, [DATA, filteredData]
  )

  const handleSearch = useCallback(
   (event) => {
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
      const newTask = {
        taskTitle: taskName,
        boardName: taskType.current.value,
        id: DATA.length,
      };

      setTaskName('');
      DATA.push(newTask)
      setDATA([
        ...DATA,
      ]);
     }
   }, [taskName, DATA]
  )
  console.log(
    DATA
  )
  return (
    <div className="todo-board">
      <h1>Todo Board</h1>
      <input type="text" id="myInput" onKeyUp={handleSearch} placeholder="Search"/>

      <p>Add task</p>
      <input type="text" value={taskName} onChange={handleTaskName} placeholder="Task Name"/>

      <select name="Change Status" ref={taskType}>
        {
          BOARD_TYPES.map(
            option => <option  value={option.value}>{option.title}</option>
          )
        }
      </select>
      <button onClick={handleAddTask}>
        ADD
      </button>

      <div>
        <Board
          title={BOARD_TYPE.TODO}
          cardsData={getData(BOARD_TYPE.TODO)}
        />
        <Board
          title={BOARD_TYPE.IN_PROGRESS}
          cardsData={getData(BOARD_TYPE.IN_PROGRESS)}
        />
        <Board
          title={BOARD_TYPE.COMPLETE}
          cardsData={getData(BOARD_TYPE.COMPLETE)}
        />
      </div>
    </div>
  )
}

export default TodoBoard;