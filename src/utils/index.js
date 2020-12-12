const BOARD_TYPE = {
  'TODO': 'TO DO',
  'IN_PROGRESS': 'IN PROGRESS',
  'COMPLETE': 'COMPLETED',
}

const BOARD_TYPES = [
  {
    value: BOARD_TYPE.TODO,
    title: 'Add to Todo',
  },
  {
    value: BOARD_TYPE.IN_PROGRESS,
    title: 'Add to In Progress',
  },
  {
    value: BOARD_TYPE.COMPLETE,
    title: 'Add to Complete',
  }
];

export {
  BOARD_TYPE,
  BOARD_TYPES,
}