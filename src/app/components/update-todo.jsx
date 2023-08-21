"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import {Tooltip} from "@nextui-org/react";
import { IconCheck } from "@tabler/icons-react";

export default function UpdateButton({ todo, addOptimisticTodo  }) {
  const router = useRouter();

  const handleUpdate = async () => {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (todo.user_completed_todo) {
        // is not completed
        addOptimisticTodo({
            ...todo,
          user_completed_todo: !todo.user_completed_todo,
        })
        await supabase.from("completed").delete().match({ user_id: user.id, todo_id: todo.id });
      } else {
        // is completed
        addOptimisticTodo({
            ...todo,
          user_completed_todo: !todo.user_completed_todo,
        })
        await supabase
          .from("completed")
          .insert({ user_id: user.id, todo_id: todo.id });
      }
      router.refresh();
    }
  };
  return (
    <Tooltip color="default" content="Check" placement={"bottom"} delay={1000}>
    <button onClick={handleUpdate} className={`p-2 -ml-2 rounded-full hover:bg-emerald-500/30 hover:text-emerald-500 ${todo.user_completed_todo ? 'text-emerald-500' : 'text-neutral-400'}`}>
      <IconCheck className="w-5 h-5" />
    </button>
    </Tooltip>
  );
}
