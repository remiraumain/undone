import { Task } from "@prisma/client";

const Task = (data: Task) => {
  return (
    <li key={data.id} className="flex items-center">
      <span
        className={`mx-2 block h-2 w-2 rounded-full border border-black ${
          data.done ? "bg-black" : "bg-transparent"
        }`}
      />
      <h4>{data.title}</h4>
      <p>{data.description}</p>
    </li>
  );
};

export default Task;
