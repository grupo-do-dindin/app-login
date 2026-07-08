"use client";

import { useActionState } from "react";
import { Button, Input, Logo } from "@dindin/design-system";
import { login, LoginState } from "./actions";

const initialState: LoginState = { error: null };
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8 px-6 py-16">
      <Logo href={APP_URL} size={56} />

      <form
        action={formAction}
        className="flex w-full flex-col gap-4 rounded-2xl bg-[#D1FAE5] p-6 shadow-md dark:bg-[#121214]"
      >
        <h1 className="text-xl font-semibold text-zinc-800 dark:text-[#E1E1E6]">
          Entrar
        </h1>

        <Input
          id="email"
          name="email"
          type="email"
          label="E-mail"
          placeholder="voce@exemplo.com"
          required
          autoComplete="email"
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Senha"
          placeholder="••••••••"
          required
          minLength={4}
          autoComplete="current-password"
        />

        {state.error && (
          <p className="text-sm text-[#F75A68]" role="alert">
            {state.error}
          </p>
        )}

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Use demo@dindin.com / dindin123 para testar.
      </p>
    </div>
  );
}
