import { api } from "~/utils/api";
import Task from "../atoms/todoTask";
import AddInput from "../atoms/todoAddInput";

const TodoList = () => {
  const { data } = api.todo.getAll.useQuery();

  return (
    <div className="rounded-xl border border-black p-4">
      <h3 className="mb-6">Tasks</h3>
      <ul>
        {data?.map((task) => (
          <Task key={task.id} {...task} />
        ))}
        <li key={data?.length}>
          <AddInput />
        </li>
      </ul>
    </div>
  );
};

export default TodoList;
