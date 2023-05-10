import { api } from "~/utils/api";
import Task from "../atoms/todoTask";
import AddInput from "../atoms/todoAddInput";
import Loading from "../atoms/loading";
import { useContext, useState } from "react";
import { TodoListContext } from "./context";

const TodoList = () => {
  const { data } = api.todo.getAll.useQuery();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TodoListContext.Provider value={{ isLoading, setIsLoading }}>
      <div className="rounded-xl border border-black p-4">
        <div className="flex justify-between">
          <h3 className="mb-6">Tasks</h3>
          <Loading isLoading={isLoading} />
        </div>
        <ul>
          {data?.map((task) => (
            <Task key={task.id} {...task} />
          ))}
          <li key={data?.length}>
            <AddInput />
          </li>
        </ul>
      </div>
    </TodoListContext.Provider>
  );
};

export default TodoList;
