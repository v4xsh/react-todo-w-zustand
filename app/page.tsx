"use client";

import React, { useEffect, useState } from "react";
import { useTodoStore } from "@/hooks/store/useTodoStore";
import { TodoInterface } from "@/types/TodoInterface";

import "@/public/colors.css";

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
    <div className="m-10">
      <div className="w-100">
        <div className="text-3xl text-center mb-8">Todo App</div>
        <div className="text-center flex items-center justify-center">
          <input
            type="text"
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
            value={todoText}
            placeholder="Add new todo"
            className="me-2 text-white bg-prim-pink px-3 py-1 rounded-full w-6/12"
          />
          <button
            onClick={() => {
              todoText.trim() && addTodo(todoText);
              setTodoText("");
            }}
            className="bg-transparent text-white ms-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-9 h-9"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap mt-3">
        {todos.map((todo: TodoInterface, index: number) => (
          <div
            key={todo.id}
            className="flex items-center p-3 m-1 bg-stone-50 inline-block text-black"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="me-2 scale-125"
              id={todo.id}
            />{" "}
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
                  type="text"
                  className="text-white bg-prim-pink px-3 py-1"
                />{" "}
                <button
                  onClick={() => {
                    finishEdit(
                      todo.id,
                      editTodosState.find((editTodo) => editTodo.id === todo.id)
                        ?.todo || ""
                    );
                  }}
                  className="bg-prim-mustard text-white px-3 py-1 ms-2 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                      clipRule="evenodd"
                    />
                    <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                  </svg>
                  <div className="ms-1">Save</div>
                </button>
              </>
            ) : (
              <>
                <label htmlFor={todo.id}>{todo.todo}</label>
                <button
                  className="bg-prim-purple text-white px-3 py-1 ms-2 flex items-center"
                  onClick={() => {
                    startEdit(todo.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg>
                  <div className="ms-1">Edit</div>
                </button>
              </>
            )}
            <button
              onClick={() => removeTodo(todo.id)}
              className="bg-prim-red text-white px-3 py-1 ms-2 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ms-1">Remove</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
