import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (isLoaded || isSignedIn) {
    // const data = api.example.hello.useQuery({ text: "from tRPC" });
  }
  const data = api.todo.getAll.useQuery();
  console.log(data.data);

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
            {data.data?.map((todo) => (
              <div key={todo.id}>
                <h2>{todo.title}</h2>
                <p className="italic text-slate-500">{todo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
