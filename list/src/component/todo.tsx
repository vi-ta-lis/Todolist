import React, { useState, useEffect } from 'react';

// Helper function to get the stored todos from localStorage
const getStoredTodos = (): string[] => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

// Helper function to store todos in localStorage
const storeTodos = (todos: string[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<string[]>(getStoredTodos());
  const [newTodo, setNewTodo] = useState<string>('');

  // Update localStorage whenever todos change
  useEffect(() => {
    storeTodos(todos);
  }, [todos]);

  // Handle adding a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo('');
    }
  };

  // Handle removing a todo
  const removeTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (

    <div className='chino '>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Todo;
