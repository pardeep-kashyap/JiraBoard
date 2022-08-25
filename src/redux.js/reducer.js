var generateLists = () => {
    return JSON.parse(localStorage.getItem('tasks')) || TASK_STATES
}

export const TASK_STATES = {
    'todo': [],
    'inProgress': [],
    'done': [],
    'hold': []
}
const tasks = {
    ...generateLists(),
    currentIndex: 0,
    currentTaskType: 'todo'
}

export const taskReducer = (state = tasks, action) => {
    let tempState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'EDIT_TASK':
            tempState[state.currentTaskType][state.currentIndex] = action.payload;
            return tempState;
        case 'UPDATE_TASK':
            return JSON.parse(JSON.stringify(action.payload.task));
        case 'REMOVE_TODO':
            tempState[state.currentTaskType] = tempState[state.currentTaskType].splice(state.currentIndex, 0);
            localStorage.setItem('tasks', JSON.stringify(tempState))
            return JSON.parse(JSON.stringify(tempState));
        case 'SET_CURRENT_DATA':
            tempState.currentTaskType = action.currentTaskType
            tempState.currentIndex = action.currentIndex
            return tempState;
        default:
            return tempState;
    }
}