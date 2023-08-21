"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

export function ComposeTodoButton({ disabled }) {
  const { pending } = useFormStatus();

  return pending ? (
    <Button
      isLoading
      type="submit"
      className="self-end px-5 py-2 text-sm font-bold text-white rounded-full bg-neutral-900 disabled:opacity-40 disabled:pointer-events-none"
    >
      Agregando
    </Button>
  ) : (
    <button
      disabled={disabled}
      type="submit"
      className="self-end px-5 py-2 text-sm font-bold text-white rounded-full bg-neutral-900 disabled:opacity-40 disabled:pointer-events-none"
    >
      Agregar
    </button>
  );
}
