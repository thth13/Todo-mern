import axios from 'axios';
import { LOAD_TODOS, ADD_TODO, DELETE_TODO, COMPLETE_TODO, EDIT_TODO } from './types';

export const loadTodos = () => dispatch => {
    axios.get('/todo')
        .then(res => 
            dispatch({
                type: LOAD_TODOS,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const addTodo = newTodo => dispatch => {
    axios.post('/todo/new', newTodo)
        .then(res => 
            dispatch({
                type: ADD_TODO,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const editTodo = (id, newTask) => dispatch => {
    axios.post(`/todo/edit/${id}`, newTask)
        .then(res =>
            dispatch({
                type: EDIT_TODO,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const deleteTodo = id => dispatch => {
    axios.delete(`/todo/delete/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_TODO,
                payload: id
            })
        )
        .catch(err => console.log(err));
};

export const completeTodo = id => dispatch => {
    axios.post(`/todo/iscomplete/${id}`)
        .then(res => 
            dispatch({
                type: COMPLETE_TODO,
                payload: id
            })
        )
        .catch(err => console.log(err));
};