"use client";

import React, { useEffect, useState } from "react";
import { useTodoStore } from "@/hooks/store/useTodoStore";
import { TodoInterface } from "@/types/TodoInterface";

const page: React.FunctionComponent = () => {
  const todoStore = useTodoStore();

  useEffect(() => {
    todoStore.getTodos();
  }, []);

  const [todoText, setTodoText] = useState<string>("");

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const currEditTodos = useTodoStore((state) => state.currEditTodos);
  const startEdit = useTodoStore((state) => state.startEdit);
  const finishEdit = useTodoStore((state) => state.finishEdit);

  const [editTodosState, setEditTodosState] = useState<TodoInterface[]>([]);
  useEffect(() => {
    setEditTodosState(currEditTodos);
  }, [currEditTodos]);

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
          {index + 1}{" "}
          {todo.editing ? (
            <>
              <input
                value={
                  editTodosState.find((editTodo) => editTodo.id === todo.id)
                    ?.todo || ""
                }
                onChange={(e) => {
                  setEditTodosState((prevTodo) =>
                    prevTodo.map((editTodo) =>
                      editTodo.id === todo.id
                        ? { ...editTodo, todo: e.target.value }
                        : editTodo
                    )
                  );
                }}
                className="text-black"
              />{" "}
              <button
                onClick={() => {
                  finishEdit(
                    todo.id,
                    editTodosState.find((editTodo) => editTodo.id === todo.id)
                      ?.todo || ""
                  );
                }}
              >
                Save
              </button>
            </>
          ) : (
            <><button
            onClick={() => {
              startEdit(todo.id);
            }}
          >
            Edit
          </button>{" "}{todo.todo}</>
          )}
        </p>
      ))}
    </div>
  );
};

export default page;
