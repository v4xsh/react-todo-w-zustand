import React from "react";
import { useTodoStore } from "@/hooks/store/useTodoStore";

interface ToggleTodoProps {
  completed: boolean;
  id: string;
}

const ToggleTodo: React.FC<ToggleTodoProps> = ({ completed, id }) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  return (
    <input
      type="checkbox"
      checked={completed}
      onChange={() => toggleTodo(id)}
      className="me-2 scale-125"
      id={id}
    />
  );
};

export default ToggleTodo;
