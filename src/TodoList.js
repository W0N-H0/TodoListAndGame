import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoListContainer = styled.div`
  padding: 20px;
`;

const TodoInput = styled.input`
  margin-right: 10px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const TodoText = styled.span`
  flex: 1;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  cursor: pointer;
`;

const TodoButton = styled.button`
  margin-left: 10px;
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditingTodoId(id);
      setEditingTodoText(todoToEdit.text);
    }
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodoId ? { ...todo, text: editingTodoText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <TodoListContainer>
      <h1>Todo List</h1>
      <TodoInput type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <div>
        <p>Total Todos: {totalTodos}</p>
        <p>Completed Todos: {completedTodos}</p>
      </div>
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            {editingTodoId === todo.id ? (
              <TodoInput
                type="text"
                value={editingTodoText}
                onChange={(e) => setEditingTodoText(e.target.value)}
              />
            ) : (
              <TodoText
                completed={todo.completed}
                onClick={() => handleToggleComplete(todo.id)}
              >
                {todo.text}
              </TodoText>
            )}
            {editingTodoId === todo.id ? (
              <>
                <TodoButton onClick={handleUpdateTodo}>Save</TodoButton>
                <TodoButton onClick={handleCancelEdit}>Cancel</TodoButton>
              </>
            ) : (
              <>
                <TodoButton onClick={() => handleEditTodo(todo.id)}>
                  Edit
                </TodoButton>
                <TodoButton onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </TodoButton>
              </>
            )}
          </TodoItem>
        ))}
      </div>
    </TodoListContainer>
  );
};

export default TodoList;
