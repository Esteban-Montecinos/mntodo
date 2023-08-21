"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import { IconBrandGoogle } from "@tabler/icons-react";

export function AuthButtonClient({ session }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session === null ? (
    <button
    onClick={handleSignIn}
      type="button"
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors bg-transparent border rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input hover:bg-white hover:text-neutral-900 h-9"
    >
    <IconBrandGoogle className="w-4 h-4 mr-2"/>
    Continúa con Google
    </button>
  ) : (
    <Dropdown>
    <DropdownTrigger>
    <User  
    className="p-2 text-xs font-light transition-colors rounded-full cursor-pointer text-neutral-400 hover:bg-neutral-800" 
    name={session?.user?.user_metadata?.name}
    description={session?.user?.user_metadata?.email}
    avatarProps={{
      src: `${session?.user?.user_metadata?.avatar_url}`
    }}
  />
    </DropdownTrigger>
    <DropdownMenu aria-label="Acciones del usuario" onAction={() => handleSignOut}>
      <DropdownItem key="delete" className="text-danger" color="danger">
        Cerrar sesión
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  );
}