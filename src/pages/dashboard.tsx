import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import TodoList from "~/components/molecules/todoList";

const Dashboard: NextPage = () => {
  const { isSignedIn } = useUser();

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
            <TodoList />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
