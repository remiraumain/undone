import { Task } from "@prisma/client";
import {
  TRPCClientError,
  TRPCClientErrorBase,
  TRPCClientErrorLike,
} from "@trpc/client";
import { TRPCContextProps } from "@trpc/react-query/shared";
import { TRPCError } from "@trpc/server";
import { use, useState } from "react";
import { IoClose } from "react-icons/io5";

import { api } from "~/utils/api";

const Task = (data: Task) => {
  const ctx = api.useContext();

  const errase = api.todo.delete.useMutation({
    onSuccess: () => {
      ctx.todo.getAll.invalidate();
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        console.log(errorMessage[0]);
      } else {
        console.log("Failed to post! Please try later.");
      }
    },
  });

  const update = api.todo.update.useMutation({
    onSuccess: () => {
      ctx.todo.getAll.invalidate();
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        console.log(errorMessage[0]);
      } else {
        console.log("Failed to post! Please try later.");
      }
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
            (update.isLoading || errase.isLoading) && "animate-pulse"
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
          (update.isLoading || errase.isLoading) && "animate-pulse"
        }`}
      >
        {data.description}
      </p>
    </li>
  );
};

export default Task;
