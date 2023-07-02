import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoListContainer = styled.div`
  padding: 0px;
  margin: 20px 30px 0px 50px;
  border: 2.5px solid black;
  border-radius: 10px;
  width: 340px;
`;

// 할일 목록
const TodoListTop = styled.div`
  border-bottom: 2.5px solid black;
  background: rgba(235, 235, 235, 0.589);
  border-radius: 10px 10px 0 0;
  padding: 5px 5px 5px 10px;
  font-size: 1.3rem;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      width: 80px;
      margin-left: 110px;
    }
  }
`;

const TodoListMain = styled.div`
  padding: 15px;
  height: 500px;
  width: 310px;

  & > button {
    background: #595959;
    border-radius: 10px;
    height: 30px;
    width: 50px;
    font-size: 0.9rem;
    color: white;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 2px solid black;
  }
`;

// 할일적으시오 칸
const TodoInput = styled.input`
  margin-right: 10px;
  padding-left: 11px;
  width: 75%;
  height: 25px;
  background: rgba(235, 235, 235, 0.589);
  border: 2px solid black;
  border-radius: 10px;
  letter-spacing: 0.1rem;
  font-size: 1rem;
  &::placeholder {
    color: black;
  }
`;

// 할일적으시오 수정칸
const TodoInput2 = styled.input`
  margin-right: 5px;
  padding-left: 1px;
  width: 65%;
  height: 25px;
  background: rgba(235, 235, 235, 0.589);
  border: 2px solid black;
  border-radius: 10px;
  letter-spacing: 0.1rem;
  font-size: 0.9rem;
`;

// 전체과제, 완성과제 있는곳
const TodoStatus = styled.div`
  margin: 15px 0 15px 0;
  padding-bottom: 15px;
  border-bottom: 2.5px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div {
    width: 44%;
    border: 2.5px solid black;
    background: rgba(235, 235, 235, 0.589);
    padding: 7px 7px 7px 0;
    border-radius: 10px;
    text-align: center;
    font-size: 1rem;
  }
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2.5px dashed black;
  padding-bottom: 15px;
`;

const TodoText = styled.span`
  flex: 1;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  cursor: pointer;
  font-size: 1.2rem;
`;

const TodoButton = styled.button`
  border: 2.5px solid black;
  border-radius: 10px;
  background: rgba(235, 235, 235, 0.589);
  font-size: 0.7rem;
  margin-left: 5px;
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
      <TodoListTop>
        <div>
          📝 할일 목록
          <img src="/imgs/menuimage.png" alt="메뉴이미지"></img>
        </div>
      </TodoListTop>

      <TodoListMain>
        <TodoInput
          type="text"
          value={inputValue}
          placeholder="할일을 적으세요."
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>추가</button>
        <TodoStatus>
          <div>전체 과제: {totalTodos}개</div>
          <div>완성 과제: {completedTodos}개</div>
        </TodoStatus>

        <div>
          {todos.map((todo) => (
            <TodoItem key={todo.id}>
              {editingTodoId === todo.id ? (
                <TodoInput2
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
                  <TodoButton onClick={handleUpdateTodo}>저장</TodoButton>
                  <TodoButton onClick={handleCancelEdit}>취소</TodoButton>
                </>
              ) : (
                <>
                  <TodoButton onClick={() => handleEditTodo(todo.id)}>
                    수정
                  </TodoButton>
                  <TodoButton onClick={() => handleDeleteTodo(todo.id)}>
                    삭제
                  </TodoButton>
                </>
              )}
            </TodoItem>
          ))}
        </div>
      </TodoListMain>
    </TodoListContainer>
  );
};

export default TodoList;
