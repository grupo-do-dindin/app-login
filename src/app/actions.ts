"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "dindin_session";
const DEMO_EMAIL = process.env.DEMO_EMAIL ?? "demo@dindin.com";
const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "dindin123";
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

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Informe um e-mail válido." };
  }

  if (password.length < 4) {
    return { error: "A senha deve ter pelo menos 4 caracteres." };
  }

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return { error: "E-mail ou senha incorretos." };
  }

  const session = Buffer.from(
    JSON.stringify({ email, iat: Date.now() }),
  ).toString("base64");

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect(APP_URL);
}
