import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoListContainer = styled.div`
  padding: 0px;
  margin: 20px 30px 0px 50px;
  border: 2.5px solid black;
  border-radius: 10px;
  width: 340px;
  height: 550px;
  ::-webkit-scrollbar {
    display: none;
    width: 0px;
  }
`;

// 할일 목록
const TodoListTop = styled.div`
  border-bottom: 2.5px solid black;
  background: rgba(235, 235, 235, 0.589);
  border-radius: 10px 10px 0 0;
  padding: 5px 5px 5px 10px;
  font-size: 1.2rem;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      width: 80px;
      margin-left: 120px;
    }
  }
`;

const TodoListMain = styled.div`
  padding: 15px;
  height: 500px;
  width: 310px;
  overflow-y: auto;

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
  text-decoration-thickness: 2px;
  text-decoration-color: black;
  cursor: pointer;
  font-size: 1rem;
  background: rgba(235, 235, 235, 0.589);
  border-radius: 10px;
  border: 2.5px solid black;
  padding: 5px;
`;

const TodoButton = styled.button`
  border: 2.5px solid black;
  border-radius: 10px;
  font-size: 0.7rem;
  margin-left: 5px;
  & > img {
    width: 22px;
  }
`;

const TodoList = ({ todos, handleDeleteTodo, setTodos }) => {
  // 상태끌어올리기 => Main 컴포넌트 const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 추가 버튼 누를시 input을 TodoItem에 추가하는 핸들러함수
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
      // 내가 선택한 todo항목의 completed 값을 현재의 반대값으로 바꿔줌
      // 따라서 클릭시 마다 완료상태가 바뀜
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // 수정버튼 클릭시 editingTodoId, EditingTodoText 상태를 바꿔주는 핸들러함수
  // + find 메서드는 true일시 해당값 자체를 반환,
  // 내가 클릭한 TodoItem의 EditingTodoId을 id로 상태변경, EditingTodoText 상태(값)를 TodoItem text값으로 상태변경
  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditingTodoId(id);
      setEditingTodoText(todoToEdit.text);
    }
  };

  // 위 handleEditTodo 핸들러 함수에서의 editingTodoId을 활용하여
  // 수정하기위한 TodoItem을 찾고, 해당 TodoItem의 값(Todos)의 값을 새로운 수정값(editingTodoText) 으로 바꿔줌
  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodoId ? { ...todo, text: editingTodoText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  // 수정 상태에서 취소버튼 눌럿을때의 핸들러함수
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
              {/* editingTodoId 상태를 비교하여, true인 경우 edit 상태의 input을 랜더링해줌 */}
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
                  <TodoButton onClick={handleUpdateTodo}>
                    {" "}
                    <img src="./imgs/save.png" alt="save이미지"></img>
                  </TodoButton>
                  <TodoButton onClick={handleCancelEdit}>
                    <img src="./imgs/close.png" alt="close이미지"></img>
                  </TodoButton>
                </>
              ) : (
                <>
                  <TodoButton onClick={() => handleEditTodo(todo.id)}>
                    <img src="./imgs/edit.png" alt="edit이미지"></img>
                  </TodoButton>
                  <TodoButton onClick={() => handleDeleteTodo(todo.id)}>
                    <img src="./imgs/close.png" alt="close이미지"></img>
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
