import { useContext, useState } from "react";
import { api } from "~/utils/api";
import { TodoListContext } from "../molecules/context";

const AddInput = () => {
  const [input, setInput] = useState("");
  const { setIsLoading } = useContext(TodoListContext);

  const ctx = api.useContext();

  const { mutate, isLoading } = api.todo.create.useMutation({
    onSuccess: async () => {
      setInput("");
      setIsLoading(false);
      await ctx.todo.getAll.invalidate();
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        console.log(errorMessage[0]);
      } else {
        console.log("Failed to post! Please try later.");
      }
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });
  return (
    <input
      className="pl-6 text-slate-400"
      type="text"
      placeholder="Add a new task"
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (input !== "") {
            mutate({ title: input, description: "" });
          }
        }
      }}
      onBlur={() => {
        if (input !== "") {
          mutate({ title: input, description: "" });
        }
      }}
      disabled={isLoading}
    />
  );
};

export default AddInput;
