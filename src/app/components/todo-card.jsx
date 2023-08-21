import Image from "next/image";
import DeleteButton from "./delete-button";
import UpdateButton from "./update-todo";

export default function TodoCard({
  userEmail,
  avatarUrl,
  createdAt,
  title,
  addOptimisticTodo,
  todo,
}) {
  const dateTodo = new Date(createdAt);
  const options = { month: "short", day: "numeric" };
  const shortTime = new Intl.DateTimeFormat("es", {
    timeStyle: "short",
  });
  return (
    <article className="flex flex-row w-full p-2 transition bg-transparent border-b rounded-none shadow-none cursor-pointer hover:bg-neutral-800 border-neutral-600">
      <aside className="flex flex-col w-10 mr-3">
        <Image
          className="rounded-full"
          width={48}
          height={48}
          src={avatarUrl}
          alt={`Foto de perfil de ${userEmail}`}
        />
      </aside>
      <main className="flex-1">
        <header className="justify-between">
          <div className="flex flex-row items-start gap-x-2">
            <span className="text-base font-light tracking-tight text-neutral-400">
              {dateTodo.toLocaleDateString("es-CL", options)} · {shortTime.format(dateTodo)}
            </span>
          </div>
        </header>
        <span
          className={`${
            todo.user_completed_todo ? 'text-neutral-500 line-through' :'text-neutral-50'} py-2 text-base bg-transparent`}
        >
          {title}
        </span>
        <footer className="flex flex-row items-center justify-between">
          <UpdateButton todo={todo} addOptimisticTodo={addOptimisticTodo}/>
          <DeleteButton todo={todo} />
        </footer>
      </main>
    </article>
  );
}
