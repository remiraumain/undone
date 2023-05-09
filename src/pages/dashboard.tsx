import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const { isSignedIn } = useUser();
  const { data } = api.todo.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Manage your life with undone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="mb-4 flex w-full justify-between">
        <h1>undone</h1>
        <div>
          {!isSignedIn && <SignInButton />}
          {isSignedIn && <UserButton />}
        </div>
      </nav>
      <main>
        <div>
          <div>
            {data?.map((todo) => (
              <div key={todo.id}>
                <h2>{todo.title}</h2>
                <p className="italic text-slate-500">{todo.description}</p>
              </div>
            ))}
            <input
              type="text"
              placeholder="Add a task"
              className="w-full bg-transparent"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
