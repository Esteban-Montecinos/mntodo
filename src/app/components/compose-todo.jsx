"use client";

import { addPost } from "../actions";
import { useRef, useState } from "react";
import { ComposeTodoButton } from "./compose-todo-button";
import { Avatar, Snippet } from "@nextui-org/react";

export const dynamic = "force-dynamic";

export function ComposeTodo({ userAvatarUrl, userEmail }) {
  const formRef = useRef();
  const [isDisabled, setIsDisabled] = useState('');
  const handleDisabledChange = (event) => {
    setIsDisabled(event.target.value);
  };
  return (
    <form
      action={async (formData) => {
        const title = formData.get("title");
        if(title === "") return
        await addPost(title);
        formRef.current?.reset();
      }}
      ref={formRef}
      className="flex flex-row w-full p-3 border-b border-neutral-600"
    >
      <Avatar
        className="object-contain w-10 h-10 mr-4 rounded-full"
        src={userAvatarUrl}
        width={48}
        height={48}
        alt="foto de perfil de GitHub"
      />
      <div className="flex flex-col flex-1 gap-y-2">
        <span className="text-base font-light tracking-tight text-neutral-400">
        <Snippet symbol="*" color="default">{`https://mntodo.vercel.app/${userEmail}`}</Snippet>
        </span>
        <textarea
          name="title"
          rows={3}
          onChange={handleDisabledChange}
          className="w-full text-lg text-white bg-transparent border-b outline-none resize-none placeholder-neutral-400 border-neutral-600"
          placeholder="Agrega una nueva tarea"
        ></textarea>
        <ComposeTodoButton disabled={isDisabled === ''}/>
      </div>
    </form>
  );
}
