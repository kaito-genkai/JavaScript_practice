import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const newTodos = [...todos, { text: newTodo, id: Date.now() }];
    setTodos(newTodos);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div id="app">
      <h1>Todoアプリ</h1>
      <form id="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          id="new-todo"
          placeholder="新しいTodoを追加"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />
        <button type="submit">追加</button>
      </form>
      <ul id="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={editTodo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="edit-input"
          />
          <button className="save" onClick={handleSave}>保存</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <div className="buttons">
            <button className="edit" onClick={() => setIsEditing(true)}>編集</button>
            <button className="delete" onClick={onDelete}>削除</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
