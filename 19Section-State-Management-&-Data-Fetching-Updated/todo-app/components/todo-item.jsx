import React from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodo } from "@/actions/todo-action";
import { toast } from "sonner";

export const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const { mutate: toggle } = useMutation({
    mutationFn: ({ id, completed }) => toggleTodo(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err);
    },
  });

  return (
    <div className="flex items-center justify-between p-4 bg-card border rounded-lg shadow-sm transition-shadow mb-3">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={(checked) =>
            toggle({ id: todo._id, completed: checked })
          }
          id={`todo-${todo._id}`}
        />

        <label
          htmlFor={`todo-${todo._id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
            todo.completed && "line-through text-muted-foreground",
          )}
        >
          {todo.title}
        </label>
      </div>

      <Button variant="destructive" size="icon" onClick={() => {}}>
        <Trash size={18} />
      </Button>
    </div>
  );
};
