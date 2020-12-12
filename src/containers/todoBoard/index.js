import React, { useCallback, useState, useRef } from 'react';
import Board from '../../components/board';

import './styles.scss';

const TODO = 'TO DO';
const IN_PROGRESS = 'IN PROGRESS';
const COMPLETE = 'COMPLETED';

const SELECT_OPTIONS = [
  {
    value: TODO,
    title: 'Add to Todo',
  },
  {
    value: IN_PROGRESS,
    title: 'Add to In Progress',
  },
  {
    value: COMPLETE,
    title: 'Add to Complete',
  }
]

const TodoBoard = () => {
  const taskType = useRef();
  const [taskName, setTaskName] = useState(''); 

  const [DATA, setDATA] = useState(
    [
      {
        id: 0,
        taskTitle: 'Finish this assignment',
        boardName: TODO,
      },
      {
        id: 1,
        taskTitle: 'Watch movie',
        boardName: TODO,
      },
      {
        id: 2,
        taskTitle: 'Watch movie',
        boardName: TODO,
      },
      {
        id: 3,
        taskTitle: 'Watch movie',
        boardName: IN_PROGRESS,
      },
      {
        id: 4,
        taskTitle: 'Watch movie',
        boardName: COMPLETE,
      }
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
      DATA.filter(d => d.taskTitle.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
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
     console.log(taskType.current.value)
     console.log(taskName)
     if (taskName) {
      const newTask = {
        taskTitle: taskName,
        boardName: taskType.current.value,
        id: DATA.length,
      };
      console.log(newTask)

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
          SELECT_OPTIONS.map(
            option => <option  value={option.value}>{option.title}</option>
          )
        }
      </select>
      <button onClick={handleAddTask}>
        ADD
      </button>

      <div>
        <Board
          title={TODO}
          cardsData={getData(TODO)}
        />
        <Board
          title={IN_PROGRESS}
          cardsData={getData(IN_PROGRESS)}
        />
        <Board
          title={COMPLETE}
          cardsData={getData(COMPLETE)}
        />
      </div>
    </div>
  )
}

export default TodoBoard;