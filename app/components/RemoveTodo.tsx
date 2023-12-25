import React from "react";
import { useTodoStore } from "@/hooks/store/useTodoStore";
import RemoveTodoIcon from "./ui/icons/RemoveTodoIcon";

interface EditTodoProps {
  id: string;
}

const RemoveTodo: React.FC<EditTodoProps> = ({ id }) => {
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <button
      onClick={() => removeTodo(id)}
      className="bg-prim-red text-white px-3 py-1 ms-2 flex items-center"
    >
      <RemoveTodoIcon />
      <div className="ms-1">Remove</div>
    </button>
  );
};

export default RemoveTodo;
