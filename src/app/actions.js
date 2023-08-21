"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function addPost(title) {

  if (title === "") return;

  const supabase = createServerActionClient({ cookies });
  // revisar si el usuario realmene está autentificado
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (user === null) return;

  await supabase.from("todos").insert({ title, user_id: user.id });

  revalidatePath("/");
}
