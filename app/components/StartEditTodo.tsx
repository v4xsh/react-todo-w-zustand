import { useTodoStore } from "@/hooks/store/useTodoStore";
import React from "react";
import EditTodoIcon from "./ui/icons/EditTodoIcon";

interface EditTodoProps {
  id: string;
}

const StartEditTodo: React.FC<EditTodoProps> = ({ id }) => {
  const startEdit = useTodoStore((state) => state.startEdit);

  return (
    <button
      className="bg-prim-purple text-white px-3 py-1 ms-2 flex items-center"
      onClick={() => {
        startEdit(id);
      }}
    >
      <EditTodoIcon />
      <div className="ms-1">Edit</div>
    </button>
  );
};

export default StartEditTodo;
