import React, { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
// EDIT
  function handleForm(e) {
    e.preventDefault();
    const updatedList = [...todoList, { todoName: todo, completed: false }];
    setTodoList(updatedList);
    setTodo("");
  }
// DELETE
  function deleteTodo(deleteValue) {
    const restTodoList = todoList.filter(function(val) {
      return val.todoName !== deleteValue;
    });
    setTodoList(restTodoList);
  }
//COMPLETE
  function toggleComplete(toggleValue) {
    const updatedList = todoList.map(function(val) {
      if (val.todoName === toggleValue) {
        return { ...val, completed: !val.completed };
      }
      return val;
    });
    setTodoList(updatedList);
  }

  function editTodo(editValue, newValue) {
    const updatedList = todoList.map(function(val) {
      if (val.todoName === editValue) {
        return { ...val, todoName: newValue };
      }
      return val;
    });
    setTodoList(updatedList);
  }

  return (
    <div className="container">
      <div>
        <h1>Quest List</h1>
        <form onSubmit={handleForm}>
          <input
            type="text"
            placeholder="Add Todo"
            value={todo}
            onChange={function(e) {
              setTodo(e.target.value);
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
        <div className="display-todo">
          <ul>
            {todoList.map(function(singleTodo, index) {
              return (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={singleTodo.completed}
                    onChange={function() {
                      toggleComplete(singleTodo.todoName);
                    }}
                  />
                  {singleTodo.todoName}{" "}
                  <button
                    onClick={function() {
                      deleteTodo(singleTodo.todoName);
                    }}
                    disabled={!singleTodo.completed}
                  >
                    Delete
                  </button>
                  <button
                    onClick={function() {
                      const newValue = prompt("Edit todo:", singleTodo.todoName);
                      if (newValue !== null && newValue.trim() !== "") {
                        editTodo(singleTodo.todoName, newValue);
                      }
                    }}
                  >
                    Edit
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
