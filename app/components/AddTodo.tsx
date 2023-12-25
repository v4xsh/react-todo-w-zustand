import React, { useState } from "react";
import { useTodoStore } from "@/hooks/store/useTodoStore";
import AddTodoIcon from "./ui/icons/AddTodoIcon";

const AddTodo = () => {
  const [todoText, setTodoText] = useState<string>("");
  const addTodo = useTodoStore((state) => state.addTodo);

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
        value={todoText}
        placeholder="Add new todo"
        className="me-2 text-white bg-prim-pink px-4 py-2 rounded-full w-8/12 sm:w-6/12"
      />
      <button
        onClick={() => {
          todoText.trim() && addTodo(todoText);
          setTodoText("");
        }}
        className="bg-transparent text-white ms-1"
      >
        <AddTodoIcon />
      </button>
    </>
  );
};

export default AddTodo;
