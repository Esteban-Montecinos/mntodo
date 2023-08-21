import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthButtonServer } from "./components/auth-buttton-server";
import { redirect } from "next/navigation";
import TodosList from "./components/todos-list";
import { ComposeTodo } from "./components/compose-todo";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session === null) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("todos")
    .select("*, user:users(id,name,email,avatar_url), completed(*)")
    .eq('user.id', `${session?.user?.id}`)
    .order("created_at", { ascending: false });

    const todos = data.map(todo => ({
      ...todo,
      user_completed_todo: todo?.completed.find(complete => complete.user_id === session.user.id)
    
    })) ?? []
  return (
    <main className="flex flex-col items-center min-h-screen px-2 bg-neutral-950">
      <section className="flex flex-col items-center w-full max-w-2xl min-h-screen mx-auto border-l border-r border-neutral-600">
        <header className="flex flex-row items-center justify-between w-full p-3 mb-4 border-b border-neutral-600">
          <h2 className="text-3xl font-semibold text-white">*M<span className="hidden sm:inline-flex">NTodo</span></h2>
          <AuthButtonServer />
        </header>
        <ComposeTodo userAvatarUrl={session.user?.user_metadata?.avatar_url} userEmail={session.user?.user_metadata?.email} />
        <TodosList todos={todos} />
        <footer className="flex items-center justify-between w-full p-4">
          <span className="text-neutral-400">
            {todos ? todos.length : 0} Tareas
          </span>
        </footer>
      </section>
    </main>
  );
}
