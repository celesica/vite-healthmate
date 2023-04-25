import React, { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';

const TodoList = () => {
    const { todos, dispatch } = useContext(TodoContext);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            dispatch({ type: 'ADD_TODO', payload: { text: newTodo } });
            setNewTodo('');
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-lg font-medium mb-2">Todo List</h2>
            <div className="flex items-center mb-4 h-full">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTodo();
                        }
                    }}
                    className="border border-gray-200 px-4 py-2 mr-2 w-full text-sm text-gray-400 outline-none focus:border-ownTeal"
                />
                <button
                    onClick={handleAddTodo}
                    className="bg-ownTeal text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>
            <ul className="list-disc pl-4">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center mb-2 ">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}
                            className="mr-2 text-ownTeal border-ownTeal text-gray-100 text-sm"
                        />
                        <input
                            type="text"
                            value={todo.text}
                            onChange={(e) => dispatch({ type: 'EDIT_TODO', payload: { id: todo.id, text: e.target.value } })}
                            className={`
                border ${todo.completed ? 'line-through text-gray-300 border-gray-100 text-sm' : 'border-gray-100 text-sm'} px-4 py-2 w-full
              `}
                        />
                        <button
                            onClick={() => dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } })}
                            className="text-sm bg-ownOrange text-white px-4 py-2 rounded ml-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
