# DinDin — Login (Zona de Autenticação)

Micro-frontend responsável exclusivamente pela tela de login do DinDin. Não é acessado diretamente pelo usuário: é servido por trás do **root** (app shell), que faz o proxy de `/login` para esta zona.

Repositório: [`grupo-do-dindin/app-login`](https://github.com/grupo-do-dindin/app-login)

## Papel na arquitetura de micro-frontends

- Roda como uma aplicação Next.js independente, na porta `3001`, com `basePath: "/login"` (`next.config.ts`).
- O `root` reescreve as rotas `/login` e `/login/*` para esta zona (ver `root/next.config.ts` e a variável `LOGIN_ZONE_URL`).
- Após autenticar, esta zona **não** gerencia a navegação internamente — ela grava o cookie de sessão e redireciona o navegador de volta para o root (`NEXT_PUBLIC_APP_URL`), que passa a reconhecer o usuário como autenticado.
- Compartilha componentes visuais com as demais zonas através do pacote `@dindin/design-system` (`Button`, `Input`, `Logo`).

## Autenticação (mock)

A action `login` (`src/app/actions.ts`) é uma Server Action que:

1. Valida formato de e-mail e tamanho mínimo de senha.
2. Compara com credenciais fixas de demonstração (`DEMO_EMAIL` / `DEMO_PASSWORD`, com fallback para `demo@dindin.com` / `dindin123`).
3. Em caso de sucesso, grava um cookie `dindin_session` (httpOnly, 8h de validade) e redireciona para `APP_URL` (o root).
4. Em caso de erro, retorna uma mensagem exibida no formulário via `useActionState`.

> Não há backend real de autenticação — é um mock para fins do desafio.

## Estrutura do projeto

```text
.
├── Dockerfile              # imagem dev-only, roda dentro do workspace npm (contexto = raiz do monorepo)
├── next.config.ts          # basePath "/login" + transpilePackages do design-system
├── package.json            # depende de @dindin/design-system via "file:../design-system"
└── src/app/
    ├── layout.tsx           # layout da zona: fonte Roboto, ThemeProvider (sem Header/Footer do root)
    ├── page.tsx             # formulário de login (client component, useActionState)
    ├── actions.ts           # Server Action "login": valida credenciais e grava cookie de sessão
    └── globals.css          # estilos globais + tokens do design-system
```

## Variáveis de ambiente

| Variável | Uso | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | URL do root para onde redirecionar após login | `http://localhost:3000` |
| `DEMO_EMAIL` | E-mail da credencial de demonstração | `demo@dindin.com` |
| `DEMO_PASSWORD` | Senha da credencial de demonstração | `dindin123` |

## Rodando localmente (sem Docker)

Este projeto faz parte do **npm workspace** definido na raiz do monorepo (`root`, `login`, `design-system`):

```bash
# na raiz do monorepo
npm install
npm run dev --workspace=login
```

Sobe a zona em `http://localhost:3001` com `basePath /login`. Para testar o fluxo completo de autenticação, acesse através do root (`http://localhost:3000/login`), pois é ele quem finaliza o redirecionamento e reconhece a sessão.

## Scripts disponíveis

- `npm run dev` — inicia o Next.js em modo desenvolvimento na porta `3001`
- `npm run build` — build de produção
- `npm run start` — inicia o servidor de produção
- `npm run lint` — executa o ESLint

## Dependências principais

- Next.js 16 / React 19
- Tailwind CSS 4
- `@dindin/design-system` (pacote local, ver [design-system/README.md](../design-system/README.md))
- `next-themes` (tema claro/escuro)
