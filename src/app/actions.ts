"use server";

import { redirect } from "next/navigation";
import { api } from "./lib/axios";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export interface LoginState {
  error: string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  let token: string;
  let accountId: string;

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Informe um e-mail válido." };
  }

  if (password.length < 4) {
    return { error: "A senha deve ter pelo menos 4 caracteres." };
  }

  try {
    const { data } = await api.post("/user/auth", {
      email,
      password,
    });

    token = data.result.token;

    const accountResponse = await api.get("/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    accountId = accountResponse.data.result.account[0].id;
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    return { error: "Erro ao fazer login!" };
  }

  redirect(`${APP_URL}/transactions/auth-callback?token=${token}&accountId=${accountId}`);
}