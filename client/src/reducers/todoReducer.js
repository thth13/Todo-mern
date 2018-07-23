import { LOAD_TODOS, ADD_TODO, DELETE_TODO, COMPLETE_TODO, EDIT_TODO } from '../actions/types';

const initialState = {
    todos: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOAD_TODOS:
            return {
                ...state,
                todos: action.payload
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(item =>
                    (item._id === action.payload._id)
                    ? {
                        ...item,
                        task: action.payload.task
                    }
                    :item
                )
            }
        case COMPLETE_TODO:
            return {
                ...state,
                todos: state.todos.map(item => 
                    (item._id === action.payload)
                    ? {...item, isComplete: !item.isComplete}
                    : item
                    )
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(item => item._id !== action.payload)
            }
        default:
            return state;
    }
}