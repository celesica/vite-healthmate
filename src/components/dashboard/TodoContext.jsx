import React, { createContext, useReducer, useEffect } from 'react';

export const TodoContext = createContext();

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                { id: Date.now(), text: action.payload.text, completed: false },
            ];
        case 'EDIT_TODO':
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.text }
                    : todo
            );
        case 'TOGGLE_TODO':
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== action.payload.id);
        default:
            return state;
    }
};

const TodoContextProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, [], () => {
        const localData = localStorage.getItem('todos');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoContext.Provider value={{ todos, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;
