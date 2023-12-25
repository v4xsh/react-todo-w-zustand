import React, { useEffect, useState } from "react";
import { useTodoStore } from "@/hooks/store/useTodoStore";
import { TodoInterface } from "@/types/TodoInterface";
import SaveTodoIcon from "./ui/icons/SaveTodoIcon";

interface EditTodoProps {
  id: string;
}

const FinishEditTodo: React.FC<EditTodoProps> = ({ id }) => {
  const finishEdit = useTodoStore((state) => state.finishEdit);
  const currEditTodos = useTodoStore((state) => state.currEditTodos);
  
  const [editTodosState, setEditTodosState] = useState<TodoInterface[]>([]);
  useEffect(() => {
    setEditTodosState(currEditTodos);
  }, [currEditTodos]);

  return (
    <>
      <input
        value={
          editTodosState.find((editTodo) => editTodo.id === id)?.todo || ""
        }
        onChange={(e) => {
          setEditTodosState((prevTodo) =>
            prevTodo.map((editTodo) =>
              editTodo.id === id
                ? { ...editTodo, todo: e.target.value }
                : editTodo
            )
          );
        }}
        max={30}
        type="text"
        className="text-white bg-prim-pink px-3 py-1 me-2"
      />{" "}
      <button
        onClick={() => {
          finishEdit(
            id,
            editTodosState.find((editTodo) => editTodo.id === id)?.todo ||
              ""
          );
        }}
        className="bg-prim-mustard text-white px-3 py-1 flex items-center"
      >
        <SaveTodoIcon />
        <div className="ms-1">Save</div>
      </button>
    </>
  );
};

export default FinishEditTodo;
