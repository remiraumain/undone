import { Task } from "@prisma/client";
import { IoClose } from "react-icons/io5";

import { api } from "~/utils/api";
import { TodoListContext } from "../molecules/context";
import { useContext } from "react";

const Task = (data: Task) => {
  const { setIsLoading } = useContext(TodoListContext);
  const ctx = api.useContext();

  const errase = api.todo.delete.useMutation({
    onSuccess: async () => {
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

  const update = api.todo.update.useMutation({
    onSuccess: async () => {
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

  /*
*
*
  I NEED TO FINISH UPDATE BUTTON
*
*
  */

  return (
    <li key={data.id} className="flex flex-col">
      <div className="flex items-center">
        <span
          className={`mx-2 block h-2 w-2 rounded-full border border-black  hover:bg-slate-200 ${
            data.done ? "bg-black hover:bg-black" : "bg-transparent"
          }`}
          onClick={() => update.mutate({ ...data, done: !data.done })}
        />
        <h4
          className={`${
            update.isLoading || errase.isLoading ? "animate-pulse" : ""
          }`}
        >
          {data.title}
        </h4>
        <IoClose
          className="m-auto mr-0 text-slate-300 hover:text-black"
          onClick={() => errase.mutate({ id: data.id })}
        />
      </div>
      <p
        className={`px-6 ${
          update.isLoading || errase.isLoading ? "animate-pulse" : ""
        }`}
      >
        {data.description}
      </p>
    </li>
  );
};

export default Task;
