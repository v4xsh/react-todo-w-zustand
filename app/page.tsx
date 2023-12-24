"use client";

import React, { useEffect, useState } from "react";
import { useTodoStore } from "@/hooks/store/useTodoStore";
import { TodoInterface } from "@/types/TodoInterface";

const page: React.FunctionComponent = () => {
  const todoStore = useTodoStore();

  useEffect(() => {
    todoStore.getTodos();
  }, []);

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const startEdit = useTodoStore((state) => state.startEdit);
  const finishEdit = useTodoStore((state) => state.finishEdit);

  const [todoText, setTodoText] = useState("");
  const [editTodoText, setEditTodoText] = useState("");

  return (
    <div className="mx-auto">
      <h1>Todo App</h1>
      <input
        type="text"
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
        value={todoText}
        className="me-2 text-black"
      />
      <button
        onClick={() => {
          todoText.trim() && addTodo(todoText);
          setTodoText("");
        }}
      >
        Add New Todo
      </button>
      {todos.map((todo: TodoInterface, index: number) => (
        <p key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />{" "}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>{" "}
          <button
            onClick={() => {
              startEdit(todo.id);
              setEditTodoText(todo.todo);
            }}
          >
            Edit
          </button>{" "}
          {index + 1}{" "}
          {todo.editing ? (
            <>
              <input
                value={editTodoText}
                onChange={(e) => {
                  setEditTodoText(e.target.value);
                }}
                className="text-black"
              />
              <button
                onClick={() => {
                  finishEdit(todo.id, editTodoText);
                  setEditTodoText("");
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>{todo.todo}</>
          )}
        </p>
      ))}
    </div>
  );
};

export default page;
