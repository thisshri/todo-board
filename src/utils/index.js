const BOARD_TYPE = {
  'TODO': 'TO DO',
  'IN_PROGRESS': 'IN PROGRESS',
  'COMPLETE': 'COMPLETED',
}

const BOARD_TYPES = [
  {
    value: BOARD_TYPE.TODO,
    title: 'Todo',
  },
  {
    value: BOARD_TYPE.IN_PROGRESS,
    title: 'Progress',
  },
  {
    value: BOARD_TYPE.COMPLETE,
    title: 'Complete',
  }
];

export {
  BOARD_TYPE,
  BOARD_TYPES,
}