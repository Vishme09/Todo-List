import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState(""); //single Todo
  const [todos, setTodos] = useState([]); //for all Todo
  const [editId, setEditId] = useState(0);
  //Whatever we right in function it should get update in todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
    //e.preventDefault();
    //we want to append in All todo array
    if (todo !== "") {
      //whatever all todo have it will take all
      //{Date.now produces unique number
      //{ id: `${todo}-${Date.now}`, todo } adding this extra
      //...todos taking already present
      setTodos([{ id: `${todo}-${Date.now}`, todo }, ...todos]);
      setTodo("");
    }
  };
  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    //i iterate through all the element when its find that one element
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        {/* Whenever we are going to do Onsubmit it is fire dunction handle submit */}
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit"> {editId ? "Edit" : "Go"} </button>
        </form>
        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>
                {t.todo}
              </span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    // <div className="App">
    //   {arr.map((num) => {
    //     return <div key={num.id}>{num.name}</div>;
    //   })}
    // </div>
  );

  // const arr = [1, 2, 3, 4, 5];
  // return (
  //   <div className="App">
  //     {/* {arr.map((num) => (
  //       <div>{num},</div>
  //     ))} */}
  //     {arr.filter((num) => num !== 3)}
  //   </div>
  // );
};

export default App;
