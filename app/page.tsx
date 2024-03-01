"use client";

import React, { useEffect, useState } from "react";
import { useTodoStore } from "@/hooks/store/useTodoStore";
import { TodoInterface } from "@/types/TodoInterface";

import "@/public/colors.css";
import AddTodo from "./components/AddTodo";
import ToggleTodo from "./components/ToggleTodo";
import EditTodo from "./components/FinishEditTodo";
import StartEditTodo from "./components/StartEditTodo";
import RemoveTodo from "./components/RemoveTodo";

const Page: React.FunctionComponent = () => {
  const todoStore = useTodoStore();

  useEffect(() => {
    todoStore.getTodos();
  }, [todoStore]);


  const todos = useTodoStore((state) => state.todos);

  return (
    <div>
      <div className="text-3xl font-bold px-6 py-4 static bg-prim-purple">Todo App</div>
      <div className="mt-10">
        <div className="text-center flex flex-row items-center justify-center">
          <AddTodo />
        </div>
      </div>
      <div className="flex flex-wrap mt-3 mx-2 sm:mx-10">
        {todos.map((todo: TodoInterface) => (
          <div
            key={todo.id}
            className="flex items-center p-3 m-1 bg-stone-50 text-black w-full sm:w-auto flex-wrap sm:flex-row justify-center sm:justify-normal"
          >
            <ToggleTodo completed={todo.completed} id={todo.id} />
            {todo.editing ? (
              <EditTodo id={todo.id} />
            ) : (
              <>
                <label htmlFor={todo.id} className={`${todo.completed ? "line-through" : ""} cursor-pointer`}>{todo.todo}</label>
                <StartEditTodo id={todo.id} />
              </>
            )}
            <RemoveTodo id={todo.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
