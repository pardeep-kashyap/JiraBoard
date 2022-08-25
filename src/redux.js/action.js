export const EDIT_TASK = 'EDIT_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_CURRENT_DATA = 'SET_CURRENT_DATA';

export function edit(task) {
    return {

        type: 'EDIT_TASK',
        task: task
    }
}

export function updateTask(payload) {
    return {
        type: 'UPDATE_TASK',
        payload
    }
}

export function removeTask({ currentTaskType, currentIndex }) {
    return {
        type: 'REMOVE_TODO',
        currentTaskType,
        currentIndex
    }
}

export function setCurrentData({ currentTaskType, currentIndex }) {
    return {
        type: 'SET_CURRENT_DATA',
        currentTaskType,
        currentIndex
    }
}

